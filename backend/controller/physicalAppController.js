import mongoose from "mongoose";
import PAppModel from "../model/physicalAppModel.js";
import sendMail from "../mail/sendMail.js";
import trainerModel from "../model/trainerModel.js";
const makeAppointment = async (req, res) => {
  const {
    patient_id,
    trainer_id,
    date,
    exlist_id,
    exercises,
    session,
    price,
    typeOfPayment,
    email,
  } = req.body;
  const appointment = new PAppModel({
    patient_id: new mongoose.Types.ObjectId(patient_id),
    trainer_id: new mongoose.Types.ObjectId(trainer_id),
    exercises,
    exlist_id,
    date,
    session,
    price,
    typeOfPayment,
    bookingStatus: "accepted",
  });
  await appointment
    .save()
    .then((data) => {
      const emailData = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "PHYSICAL SESSION BOOKING",
        html: `
              <p>Detail of your appointment booking</p>
              Date: ${date} at ${session}.
                Exercise: ${exercises.map((exercise) => {
          return `<p>${exercise.exercise_id.name}</p> <br/>`;
        })}
              `,
      };
      sendMail(req, res, emailData);
      return res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err)
      return res.status(401).json({
        error: err,
      });
    });
};

const list_appointment = async (req, res) => {
  const role = req.params.role
  let query
  switch (role) {
    case 'trainer':
      const user = await trainerModel.findOne({ user_id: req.params.id });
      query = { trainer_id: user._id }
      break;
    case 'patient':
      query = { patient_id: req.params.id }
      break;
    default:
      query = {}
  }
  await PAppModel
    .find(query)
    .populate("patient_id", "-username -password")
    .populate("trainer_id")
    .populate({
      path: "exercises.exercise_id",
      populate: {
        path: "machine_id"
      }
    })
    .then((appointments) => {
      return res.status(200).json(appointments);
    })
    .catch((err) => {
      console.log(err)
      return res.status(401).json({ error: err });
    });
};

const apppointment_details = async (req, res) => {
  // const query = { _id: req.params.id }
  await PAppModel
    .findById(req.params.id)
    .populate("patient_id", "-username -password")
    .populate("trainer_id")
    .populate({
      path: "exercises.exercise_id",
    })
    .then((appointment) => res.json(appointment))
    .catch((err) => {
      console.log(err)
      return res.status(401).json({ error: err });
    });


};

const update_phy_appointment_paid = async (req, res) => {
  const appointment = await PAppModel.findById(req.params.id);
  if (appointment) {
    appointment.isPaid = true;
    appointment.paidAt = Date.now();

    appointment.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      // email_address: req.body.payer.email_address,
    };
    const appointmentUpdate = await appointment.save();
    res.json(appointmentUpdate);
  } else {
    res.status(404).json({
      error: "Order not found",
    });
  }
};

const update_status = async (req, res) => {
  const response = await PAppModel.updateOne({ "exercise._id": req.params.id }, { $set: { "exercise.exercise_status": req.body.status } });
  if (response) {
    res.json(response);
  }
  else {
    res.status(404).json({
      error: "Error updating status",
    });
  }
}

const update_booking_status = async (req, res) => {
  const appointment = await PAppModel.findById(req.params.id);
  if (appointment) {
    appointment.booking_status = req.body.status
    const appointmentUpdate = await appointment.save();
    res.json(appointmentUpdate);
  } else {
    res.status(404).json({
      error: "Appointment not found",
    });
  }
}

export {
  makeAppointment,
  list_appointment,
  apppointment_details,
  update_phy_appointment_paid,
  update_status,
  update_booking_status,
};

//getappointment (by patient-id appointment-id, all ids, )
//getappointment_id => appointment_details 

