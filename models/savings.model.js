const mongoose = require("mongoose")

const savingSchemaa = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    reletedSaving: { type: mongoose.Schema.Types.ObjectId, ref: "Expense"}, // expense lined to the saving..
    
}, {timestamps: true}
)

const Saving = mongoose.model("Saving", savingSchemaa)

module.exports = Saving 