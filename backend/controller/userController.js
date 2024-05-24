import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import sendMail from "../mail/sendMail.js";
import doctorModel from "../model/doctorModel.js";
import mongoose from "mongoose";
import trainerModel from "../model/trainerModel.js";

const login = (req, res) => {
  const { username, password } = req.body;
  userModel
    .findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: " User does not exists!",
        });
      }
      if (!user.matchPassword(password)) {
        return res.status(400).json({
          message: "Username or password is wrong.",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const { _id, username, name, email, role } = user;
      return res.json({
        _id,
        username,
        name,
        email,
        role,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ error: err });
    });
};

const register = (req, res) => {
  const {
    username,
    email,
    name,
    gender,
    dob,
    ethnic,
    nationality,
    phoneNumber,
    address,
    password,
    role,
  } = req.body.username;
  userModel
    .findOne({ username })
    .then((user) => {
      if (user) {
        res.status(400).json({
          error: "Username already exists",
        });
      } else {
        const token = jwt.sign(
          {
            username,
            email,
            name,
            gender,
            dob,
            ethnic,
            nationality,
            phoneNumber,
            address,
            password,
            role,
          },
          process.env.JWT_ACC_ACTIVATE,
          {
            expiresIn: "10m",
          }
        );
        const emailData = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: "ACCOUNT ACTIVATION LINK",
          html: `
              <p>http://localhost:3000/auth/activate/${token}</p>
              `,
        };
        sendMail(req, res, emailData);
      }
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const accountActivation = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          error: "Expired Link",
        });
      }
      const {
        username,
        email,
        name,
        gender,
        dob,
        ethnic,
        nationality,
        phoneNumber,
        address,
        password,
        role,
      } = jwt.decode(token);
      const user = new userModel({
        username,
        email,
        name,
        gender,
        dob,
        ethnic,
        nationality,
        phoneNumber,
        address,
        password,
        role,
      });
      await user
        .save()
        .then((result) => {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
          });
          const { _id, username, name, email, role } = user;
          return res.status(201).json({
            _id: _id,
            username: username,
            name: name,
            email: email,
            role: role,
            token,
          });
        })
        .catch((err) => {
          return res.status(401).json({
            error: "Cannot save in database",
          });
        });
    });
  } else {
    return res.json({
      message: "Something wrong with token",
    });
  }
};

const list_users = async (req, res) => {
  const role = req.query.role
    ? req.query.role === "employee"
      ? { role: { $ne: "patient" } }
      : {
        role: `${req.query.role}`,
      }
    : {};
  await userModel
    .find({ ...role })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_user = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  await user
    .deleteOne()
    .then(() => {
      return res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_staff = async (req, res) => {
  const user = await trainerModel.findOne({user_id: req.params.id}); 
  await user
    .deleteOne()
    .then(() => { 
      return res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const get_user_by_id = async (req, res) => {
  await userModel
    .findById(req.params.id)
    .select("-password")
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) =>
      res.status(401).json({
        error: err,
      })
    );
};

const update_user = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;
    user.dob = req.body.dob || user.dob;
    user.ethnic = req.body.ethnic || user.ethnic;
    user.nationality = req.body.nationality || user.nationality;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address || user.address;
    user.role = req.body.role || user.role;
    await user
      .save()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((e) =>
        res.status(401).json({
          error: err,
        })
      );
  } else {
    res.status(404).json({
      error: "User not found",
    });
  }
};

const register_as_admin = (req, res) => {
  const {
    username,
    email,
    name,
    gender,
    dob,
    ethnic,
    nationality,
    phoneNumber,
    address,
    password,
    role,
  } = req.body;
  userModel
    .findOne({ username })
    .then(async (user) => {
      if (user) {
        res.status(400).json({
          error: "Username already exists",
        });
      } else {
        const user = new userModel({
          username,
          email,
          name,
          gender,
          dob,
          ethnic,
          nationality,
          phoneNumber,
          address,
          password,
          role,
        });
        await user
          .save()
          .then((data) =>
            res.status(200).json({
              userData: data,
              passwordBeforeHash: password, 
              message: "User created successfully!",
            })
          )
          .catch((err) => {
            return res.status(401).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const register_staff_as_admin = async (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.params.id)
  const {
    name,
    department,
    experience,
    language,
    imageLink} = req.body
  const trainer = new trainerModel({
    user_id,
    name,
    department,
    experience, 
    language,
    imageLink
  })
  await trainer
          .save()
          .then((data) =>
            res.status(200).json({
              trainerData: data,
              message: "Trainer created successfully!",
            })
          )
          .catch((err) => {
            return res.status(401).json({
              error: err,
            });
          });
}

const get_doctor_by_id = async (req, res) => {
  await doctorModel
    // .findOne(req.query.id)
    .aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(`${req.params.id}`),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "clinic_id",
          foreignField: "_id",
          as: "clinic",
        },
      },
    ])
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(401).json({ error: err }));
};

const list_doctors = async (req, res) => {
  
  const query = req.query.department?.length>0? {
    clinic_id: new mongoose.Types.ObjectId(`${req.query.department}`),
  }: {}
  await doctorModel
    .aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "clinic_id",
          foreignField: "_id",
          as: "clinic",
        },
      },
      {
        $project: {
          
          "user.username": 0,
          "user.password": 0
        },
      },
    ])
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ error: err });
    });
};

const list_doctors_by_clinic = async (req, res) => {
  await doctorModel.find({ clinic_id: req.params.department })
    .then((data => res.status(200).json(data)))
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ error: err });
    });

}

const reviewDoctor = async (req, res) => {
  const { rating, comment } = req.body.review;
  const userID = new mongoose.Types.ObjectId(req.body.userID);
  const doctor = await doctorModel.findById(req.params.id);
  if (doctor) {
    const isReviewed = doctor.reviews.find((r) => r.user === userID);
    if (isReviewed) {
      res.status(400).json({
        error: "You have already reviewed!",
      });
    }
    const user = await userModel.findById(req.body.userID);
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: userID,
    };
    doctor.reviews.push(review);
    doctor.numReviews = doctor.reviews.length;
    doctor.rating =
      doctor.reviews.reduce((acc, item) => item.rating + acc, 0) /
      doctor.reviews.length;
    await doctor.save();
    res.status(201).json({
      message: "Added Review",
    });
  } else {
    res.status(404).json({
      error: "User not found!",
    });
  }
};

const update_doctor = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const doctor = await doctorModel.findById(req.params.id);
  // return res.json(doctor)
  if (doctor) {
    doctor.workingHours = req.body.working_hours || [];
    await doctor
      .save()
      .then((data) => res.status(200).json(data))
      .catch((e) =>
        res.status(401).json({
          error: err,
        })
      );
  } else {
    res.status(404).json({
      error: "Doctor not found",
    });
  }
};

const list_trainers = async (req, res) => {
    await trainerModel.find()
    .populate({
      path: "user_id",
      select:"-_id -username -password"
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ error: err });
    });
};


export {
  login,
  register,
  accountActivation,
  list_users,
  delete_user,
  get_user_by_id,
  update_user,
  register_as_admin,
  register_staff_as_admin,
  get_doctor_by_id,
  list_doctors,
  list_doctors_by_clinic,
  reviewDoctor,
  update_doctor,
  list_trainers,
  delete_staff,
};
