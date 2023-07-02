const IncomeSchema = require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const income = IncomeSchema({
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

        await income.save()
        return res.status(200).json({ 
            msg: "Income Added",
            result: req.body
         })
    } catch (error) {
        return res.status(500).json({ msg: "Server erroe: " + error })
        
    }
}

exports.getIncomes = async(req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        return res.status(500).json({ msg: "Server erroe: " + error }) 
    }
}

exports.deleteIncome = async(req, res) =>{
  const{id} = req.params;
  IncomeSchema.findByIdAndDelete(id)
  .then((income) => {
    res.status(200).json({msg:"Income deleted"+income})
}).catch((err)=>{
      res.status(500).json({msg:"Server Error"+err})
  })
}