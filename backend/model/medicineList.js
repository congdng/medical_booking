import { Schema, Types, model } from "mongoose"

const FreqDetail = Schema({
    morning: String,
    afternoon: String,
    evening: String,
    beforeMeal: String,
    afterMeal: String,
})

const MedicineDetail = Schema({
    medicine_id: {
        type: Types.ObjectId,
        ref: 'medicines'
    },
    dosage: String,
    frequency: { type: [FreqDetail] },

})

const MLSchema = Schema({
    amount: String,
    description: String,
    medicines: { type: [MedicineDetail] }
}, { timestamps: true })

const MLModel = model('medicinelists', MLSchema)

export default MLModel;