import machineModel from "../model/machineModel.js";

const list_machines = async (req, res) => {
  await machineModel
    .find({})
    .populate("clinicid", "_id name")
    .then((machines) => {
      return res.status(200).json(machines);
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_machine = async (req, res) => {
  const machine = await machineModel.findById(req.params.id);
  await machine
    .remove()
    .then(() => {
      return res.status(200).json({ message: "machine deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const get_machine_by_id = async (req, res) => {
  await machineModel
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

export { list_machines, delete_machine, get_machine_by_id };
