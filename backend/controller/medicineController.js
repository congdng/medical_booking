import medModel from "../model/medicineModel.js";

const list_medicines = async (req, res) => {
  await medModel
    .find({})
    .then((medicines) => {
      return res.status(200).json(medicines);
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_medicine = async (req, res) => {
  const medicine = await medModel.findById(req.params.id);
  await medicine
    .remove()
    .then(() => {
      return res.status(200).json({ message: "medicine deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const get_medicine_by_id = async (req, res) => {
  await medModel
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

export { list_medicines, delete_medicine, get_medicine_by_id };
