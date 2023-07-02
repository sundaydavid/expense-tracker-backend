const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ msg: "Amount must be a positive number" })
        }

        await expense.save()
        return res.status(200).json({ 
            msg: "Expense Added",
            result: req.body
         })
    } catch (error) {
        return res.status(500).json({ msg: "Server erroe: " + error })
        
    }
}

exports.getExpenses = async(req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        return res.status(500).json({ msg: "Server erroe: " + error }) 
    }
}

exports.deleteExpense = async(req, res) =>{
  const{id} = req.params;
  ExpenseSchema.findByIdAndDelete(id)
  .then((expense) => {
    res.status(200).json({msg:"Expense deleted"+expense})
}).catch((err)=>{
      res.status(500).json({msg:"Server Error"+err})
  })
}