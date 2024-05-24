import mongoose from "mongoose";
import apptModel from "../model/appointmentModel.js";
import sendMail from "../mail/sendMail.js";
import doctorModel from "../model/doctorModel.js";

const makeAppointment = async (req, res) => {
  const {
    patient_id,
    doctor_id,
    clinic_id,
    date,
    symptom,
    session,
    reMedical,
    email,
    gender,
    dob,
    price,
    typeOfPayment,
    phoneNumber,
    address,
    name,
    bookingStatus
  } = req.body;
  const appointment = new apptModel({
    patient_id: new mongoose.Types.ObjectId(patient_id),
    doctor_id: new mongoose.Types.ObjectId(doctor_id),
    clinic_id: new mongoose.Types.ObjectId(clinic_id),
    date,
    symptom,
    session,
    reMedical,
    email,
    gender,
    dob,
    price,
    typeOfPayment,
    phoneNumber,
    address,
    name,
    bookingStatus,
  });
  await appointment
    .save()
    .then((data) => {
      const emailData = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "APPOINTMENT BOOKING",
        html: `
            <p>Detail of your appointment booking</p>
            Date: ${date} at ${session}
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

const get_appointment_by_id = async (req, res) => {
  await apptModel
    .findById(req.params.id)
    .populate("patient_id", "name email phoneNumber")
    .populate("clinic_id", "name")
    .populate({
      path: "doctor_id",
      select: "rating numReviews",
      populate: { path: "user_id", select: "name" },
    })
    .then((appointment) => res.json(appointment))
    .catch((err) =>
      res.status(401).json({
        error: err,
      })
    );
};

const update_appointment_paid = async (req, res) => {
  const appointment = await apptModel.findById(req.params.id);
  if (appointment) {
    if (req.body.method) {
      appointment.typeOfPayment = req.body.method;
    }
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

const get_appointment_by_user = async (req, res) => {
  const id = req.params.id;
  const appointments = await apptModel
    .find({ patient_id: id })
    .populate("patient_id", "name email phoneNumber")
    .populate("clinic_id", "name")
    .populate({
      path: "doctor_id",
      select: "rating numReviews",
      populate: { path: "user_id", select: "name" },
    });
  res.json(appointments);
};

const list_appointment = async (req, res) => {
  await apptModel
    .find({})
    .populate("patient_id", "name email phoneNumber")
    .populate("clinic_id", "name")
    .populate({
      path: "doctor_id",
      select: "rating numReviews",
      populate: { path: "user_id", select: "name" },
    })
    .then((appointments) => {
      return res.status(200).json(appointments);
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
};

const delete_appointment = async (req, res) => {
  const appointment = await apptModel.findById(req.params.id);
  await appointment
    .remove()
    .then(() => {
      return res.status(200).json({ message: "Appointment deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const update_appointment = async (req, res) => {
  try {
    await apptModel.findOneAndUpdate(
      { _id: req.params.id },  
      { $set: req.body },   
      { new: true }           // Return the updated document
    ).then(data => {
      return res.json(data);
    }).catch(err => {
      return res.status(401).json({ error: err });
    });
  } catch (error) {
    return res.status(401).json({
      error: err,
    });
  }

};

const get_appointment_by_doctor = async (req, res) => {
  await doctorModel.find({ user_id: req.params.id })
    .then(async data => {
      await apptModel.find({ doctor_id: data[0]._id })
        .populate("patient_id", "name email phoneNumber")
        .populate("clinic_id", "name")
        .populate({
          path: "doctor_id",
          select: "rating numReviews",
          populate: { path: "user_id", select: "name" },
        })
        .then(appointments => {
          console.log(appointments)
          res.json(appointments)
        })
        .catch((err) => {
          return res.status(401).json({ error: err });
        });
    }).catch((err) => {
      return res.status(401).json({ error: err });
    });
}

export {
  makeAppointment,
  get_appointment_by_id,
  update_appointment_paid,
  get_appointment_by_user,
  get_appointment_by_doctor,
  list_appointment,
  delete_appointment,
  update_appointment,
};
