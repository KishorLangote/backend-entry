const mongoose = require("mongoose")

const incomeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },

    amount: {
        type: Number, 
        required: true,
    },

    entryType: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    
    reletedExpenses: { type: mongoose.Schema.Types.ObjectId, ref: "Expense"}
}, // expense linked to the income..
 { timestamps: true},
)

const Income = mongoose.model("Income", incomeSchema)

module.exports = Income