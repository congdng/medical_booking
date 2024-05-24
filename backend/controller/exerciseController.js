import exerciseModel from "../model/exerciseModel.js";

const list_exercises = async (req, res) => {
  await exerciseModel
    .find({})
    .populate("machine_id", "_id name description setUpTime")
    .then((exercises) => {
      return res.status(200).json(exercises);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        error: err,
      });
    });
};

const delete_exercise = async (req, res) => {
  const exercise = await exerciseModel.findById(req.params.id);
  await exercise
    .remove()
    .then(() => {
      return res.status(200).json({ message: "exercise deleted" });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

const get_exercise_by_id = async (req, res) => {
  await exerciseModel
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

export { list_exercises, delete_exercise, get_exercise_by_id };
