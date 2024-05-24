import clinicModel from "../model/clinicModel.js";

const list_clinics = async (req, res) => {
  await clinicModel
    .find({})
    .then((clinics) => {
      return res.status(200).json(clinics);
    })
    .catch((err) => {
      console.log(err)
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_clinic = async (req, res) => {
  const clinic = await clinicModel.findById(req.params.id);
  await clinic
    .remove()
    .then(() => {
      return res.status(200).json({ message: "Clinic deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const get_clinic_by_id = async (req, res) => {
  await clinicModel
    .findById(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) =>
      res.status(401).json({
        error: err,
      })
    );
};

const update_clinic = async (req, res) => {
  const clinic = await clinicModel.findById(req.params.id);
  console.log(clinic)
  if (clinic) {
    clinic.name = req.body.name || clinic.name;
    clinic.description = req.body.description || clinic.description;
    clinic.image = req.body.image || clinic.image;
    clinic.link = req.body.link || clinic.link;
    clinic.special = req.body.special || clinic.special;
    await clinic
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
      error: "Clinic not found",
    });
  }
};

const create_clinic = (req, res) => {
  const { name, description, image, special, link } = req.body;
  clinicModel
    .findOne({ name })
    .then(async (clinic) => {
      if (clinic) {
        res.status(400).json({
          error: "Clinic already exists",
        });
      } else {
        const clinic = new clinicModel({
          name,
          description,
          image,
          special,
          link,
        });
        await clinic
          .save()
          .then(() =>
            res.status(200).json({
              message: "Clinic created successfully!",
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


export {
  list_clinics,
  delete_clinic,
  get_clinic_by_id,
  update_clinic,
  create_clinic,
};
