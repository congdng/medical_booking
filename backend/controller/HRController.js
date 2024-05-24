import ELModel from "../model/exerciseListMode.js";
import { ERModel } from "../model/exerciseRecordModel.js";
import HRModel from "../model/healthRecordMode.js";
import { Types } from "mongoose"
import MLModel from "../model/medicineList.js";

export const createHealthRecord =  async (req, res) =>{
    const HRRecord = new HRModel({...req.body, ptid: req.params.id})
    try{
        await HRRecord.save().then(data => {
            console.log(data);
            res.status(201).json(data);
        }).catch(err => {
            res.status(500).json({ error: err });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
   
}

export const saveHealthRecord = async (req, res) => {
    try {
        const { medicineSendList, exerciseSendList, ...rest } = req.body;
        // console.log(medicineSendList)

        //FOR EXERCISES
        let exercises
        if (exerciseSendList.length > 0) {
            exercises = exerciseSendList.map(item => {
                return {
                    ...item,
                    exercise_id: new Types.ObjectId(item.exercise_id)
                };
            });
        }
        else {
            exercises = exerciseSendList
        }

        const ELRecord = new ELModel({ exercises })
        let ELData
        await ELRecord.save().then(data => {
            ELData = data;

        })
        const ELID = ELData._id

        //FOR MEDICINES
        let medicines
        if (medicineSendList.length > 0) {
            medicines = medicineSendList.map(item => {
                return {
                    ...item,
                    medicine_id: new Types.ObjectId(item.medicine_id)
                };
            });
        }
        else {
            medicines = medicineSendList
        }
        const MLRecord = new MLModel({ medicines })
        let MLData
        await MLRecord.save().then(data => {
            MLData = data;
        })
        const MLID = MLData._id


        //SAVE IN DB
        const HRRecord = new HRModel({ ...rest, elid: ELID, mlid: MLID, ptid: req.params.id })
        HRRecord.save().then(data => {
            console.log("HRDATA", data)
            res.status(201).json({ data: data });
        }
        ).catch(err => {
            res.status(500).json({ error: err });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const getHealthRecord = (req, res) => {
    try {
        HRModel.find({ ptid: req.params.id })
            .populate({
                path: "elid",
                populate: {
                    path: "exercises.exercise_id",
                    select: "name price"
                }
            })
            // HRModel.aggregate([
            // {$match: {
            //     ptid: new Types.ObjectId(`${req.params.id}`),
            //     }},
            //     {
            //         '$lookup': {
            //           'from': "exerciselists",
            //           'localField': "elid",
            //           'foreignField': "_id",
            //           'as': "exercises",
            //         },

            //             '$unwind': {
            //               'path': '$exercises'
            //             }
            //           }, {
            //             '$lookup': {
            //               'from': 'exercises', 
            //               'localField': 'exercises.exercise_id', 
            //               'foreignField': '_id', 
            //               'as': 'exercise'
            //             }
            //           }, {
            //             '$unwind': {
            //               'path': '$exercise'
            //             }
            //           }, {
            //             '$addFields': {
            //               'exercises.name': '$exercise.name', 
            //               'exercises.desc': '$exercise.desc', 
            //               'exercises.category': '$exercise.category', 
            //               'exercises.price': '$exercise.price', 
            //               'exercises.machine_id': '$exercise.machine_id'
            //             }
            //           }, {
            //             '$group': {
            //               '_id': '$_id', 
            //               'exercises': {
            //                 '$push': '$exercises'
            //               }
            //             }
            //           }

            // ])
            .then(data => {
                console.log(data)
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}

export const updateHealthRecord = async (req, res) => {
    try {
        const { medicineSendList, exerciseSendList, ...rest } = req.body;
        // console.log(medicineSendList)
        let listToUpdate = {}
        //FOR EXERCISES
    
        if (exerciseSendList.length > 0) {
            const exercises = exerciseSendList.map(item => {
                return {
                    ...item,
                    exercise_id: new Types.ObjectId(item.exercise_id)
                };
            });
            const ELRecord = new ELModel({ exercises })
            let ELData
            await ELRecord.save().then(data => {
                ELData = data;
    
            })
            const ELID = ELData._id
            listToUpdate.elid = ELID
        }

        //FOR MEDICINES
     
        if (medicineSendList.length > 0) {
            const medicines = medicineSendList.map(item => {
                return {
                    ...item,
                    medicine_id: new Types.ObjectId(item.medicine_id)
                };
            });
            const MLRecord = new MLModel({ medicines })
            let MLData
            await MLRecord.save().then(data => {
                MLData = data;
            })
            const MLID = MLData._id
            listToUpdate.mlid = MLID
        }

      await HRModel.findOneAndUpdate(
        { _id: req.params.id },  
        { $set: {...rest, ...listToUpdate} },   
        { new: true }          
      ).then(data => {
        return res.json(data);
      }).catch(err => {
        return res.status(401).json({ error: err });
      });
    } catch (error) {
        console.log(error)
      return res.status(401).json({
        error: error,
      });
    }
  
  };

export const saveExerciseRecord = async (req, res) => {
    const { exerciseList, exlist_id_to_update, ...rest } = req.body;
    try {
        let list_of_exercises
        if (exerciseList.length > 0) {
            list_of_exercises = exerciseList.map(item => {
                return {
                    ...item,
                    exercise_id: new Types.ObjectId(item.exercise_id)
                };
            });
        }
        else {
            list_of_exercises = exerciseList
        }
        const ERRecord = new ERModel({ list_of_exercises, ...rest })
        const response = ERRecord.save()
        console.log(response)
        if (response) {
            if (exlist_id_to_update) {
                const update = await ELModel.updateOne({ _id: exlist_id_to_update }, { $inc: { numberOfDaysDone: 1 } })
                console.log(update);
            }
        }
        res.status(200).json({ response })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
export const getExerciseRecord = (req, res) => {
    try {
        ERModel.find({ patient_id: req.params.id })
        .populate({
            path: "appt_id",
            select: "session date exlist_id",
            populate:{
                path: "exlist_id",
                populate:  
                {
                    path: "exercises.exercise_id",
                    select: "name",
                },
                }})
        .populate({
            path: "trainer_id",
            select: "name"
        })

        // ERModel.aggregate([
        //     {
        //         $match: { patient_id: new Types.ObjectId(`${req.params.id}`) }
        //     },
        //     {
        //         $lookup: {
        //             from: "physioappointments",
        //             localField: "appt_id",
        //             foreignField: "_id",
        //             as: "appointment"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "exerciselists",
        //             localField: "appointment.exlist_id",
        //             foreignField: "_id",
        //             as: "exercise_needed"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "trainer_id",
        //             foreignField: "_id",
        //             as: "trainer"
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$exercise_needed", 
        //             sessions: { $push: "$$ROOT" } 
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             sessions: {
        //                 feedback: 1,
        //                 appointment: {
        //                     session: 1,
        //                     date: 1,
        //                 },
        //                 trainer: {
        //                     name: 1
        //                 },
        //                 list_of_exercises: 1,
        //             },

        //         }
        //     }
        // ])

            .then(data => {
                console.log(data);
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}
export const getERFromAppDetail = (req, res) => {
    try {
        ERModel.findOne({ appt_id: req.params.id })
            .populate({
                path: "appt_id",
                select: "session"
            })
            .populate({
                path: "list_of_exercises",
                populate: {
                    path: "exercise_id",
                    select: "name machine_id",
                    populate: {
                        path: "machine_id",
                        select: "name"
                    }
                }
            })
            .populate({
                path: "trainer_id",
                select: "name"
            })
            .then(data => {
                console.log(data)
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}


