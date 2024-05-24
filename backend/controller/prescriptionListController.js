import { Types } from "mongoose"
import HRModel from "../model/healthRecordMode.js";

const getPatientMedicineList = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const medicineList = await HRModel.find({ ptid: new Types.ObjectId(patient_id) }, 'mlid updatedAt')
            .populate({
                path: 'mlid',
                populate: {
                    path: 'medicines.medicine_id'
                }
            });
        res.json(medicineList);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export { getPatientMedicineList }
