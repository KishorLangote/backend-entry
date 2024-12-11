const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
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
        
        reletedIncomes: { type: mongoose.Schema.Types.ObjectId, ref: "Income" }, // income lined to this expense..
        reletedSavings: { type: mongoose.Schema.Types.ObjectId, ref: "Saving" }, // income lined to this expense..

},

 { timestamps: true }, 
)

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense