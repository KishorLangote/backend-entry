const express = require('express')
require("dotenv").config()
const app = express()

const cors =  require("cors")
const corsOptions = {
    origin: "*",
    Credential: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) //  cors middleware 


const { initializeDatabase } = require("./db/db.connect")
const Expense = require("./models/expenses.model")
const Income = require("./models/income.model")
const Saving = require("./models/savings.model")

app.use(express.json()) // middleware for parsing json bodies..

initializeDatabase() // this means calling the databse..



// const expenseData = {
//     description: "freelance",
//     amount: 15000,
//     entryType: "income"
// }

// const expenseData = {
//     description: "freelance",
//     amount: 15000,
//     entryType: "expense"
// }


// routes

app.get("/", (req, res) => {
    res.send("Hello, express server.")
})


// create expenses..

const expenseData = {
    description: "work from office", 
    amount: 1500,
    entryType: "expense"
}

const createExpense = async () => {
    try {
        const newExpense = new Expense(expenseData) 
        const saveExpense = await newExpense.save()
        return saveExpense
        // console.log("New Expense:", saveExpense)
    } catch (error) {
        console.log("Error:", error)
    }
}


// createExpense()

// create incomes..

const incomeData = {
    description: "work from home",
    amount: 800,
    entryType: "income"
}

const createIncome = async () => {
    try {
        const newIncome = new Income(incomeData)
        const saveIncome = await newIncome.save()
        return saveIncome
        // console.log("Income data:", saveIncome)
    } catch (error) {
        throw error
    }
}

// createIncome()


// create savings..

const savingData = {
    description: "Salary",
    amount: 5000,
}

const createSaving = async () => {
    try {
        const newSaving = new Saving(savingData)
        const saveSaving = await newSaving.save()
        return saveSaving
        // console.log("New saving:",saveSaving)
    } catch (error) {
        throw error
    }
}

// createSaving()
// get the savings data..

app.get("/savings", async (req, res) => {
    try {
        const savingsData = await Saving.find()
        res.json(savingsData)
    } catch (error) {
        console.log("Error fetching saving data.", error)
        res.status(500).json({error: "Error fetching savings data"})
    }
})


// get the expense data..

app.get("/expenses", async (req, res) => {
    try {
        const expenseData = await Expense.find()
        res.json(expenseData)
    } catch(error) {
        console.log("Error fetching expense data.", error)
        res.status(500).json({error: "Error fetching expense data."})
    }
})


app.post("/add-expense", async (req, res) => {
    const { description, amount, entryType } = req.body

    if(!description || !amount || !entryType) {
        return res.status(400).json({ error: "Description, amount are required."})
    }

    try {
        await Expense.create({ description, amount, entryType })
        res.status(200).json({ success: true, data: { description, amount, entryType }})
    } catch (error) {
        console.log("Error adding entry:", error)
        res.status(500).json({error: "Error adding entry"})
    }
})


// get the all data by expenses entry Type ...

async function readAllEntrytypeByExpense(expenseType) {
    try {
        const entryTypeByExpense = await Expense.find({ entryType: "expense" })

        return entryTypeByExpense
    } catch (error) {
        throw error
    }
}

app.get("/expenses/:expenseType", async (req, res) => {
    try {
        const expenseData = await readAllEntrytypeByExpense(req.params.expenseType)
        if(expenseData.length > 0){
            res.json(expenseData)
        }
    } catch (error) {
        console.log("Error fetching expense data.", error)
        res.status(500).json({error: "Error fetching expense data."})
    }
})



// get the income data..

app.get("/incomes", async (req, res) => {
    try {
        const incomeData = await Income.find()
        res.json(incomeData)
    } catch (error) {
        console.log("Error fetching income data.", error)
        res.status(500).json({error: "Error fetching income data."})
    }
})


app.post("/add-income", async (req, res) => {
    const { description, amount, entryType } = req.body;

    if(!description || !amount || !entryType) {
        return res.status(400).json({ error: "Description, amount are requried."})
    }

    try {
        await Income.create({description, amount, entryType}) 
        res.status(200).json({ success: true, data: { description, amount, entryType}})
    } catch (error) {
        console.log("Error adding entry:", error)
        res.status(500).json({ error: "Error adding entry."})
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})
