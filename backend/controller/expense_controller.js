const Expense = require('../models/Expense');

const expenseController = {
  // Get all expenses
  getAllExpenses: async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.status(200).json({ success: true, data: expenses });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Create new expense
  createExpense: async (req, res) => {
    try {
      const { name, amount } = req.body;
      const newExpense = await Expense.create({ name, amount });
      res.status(201).json({ success: true, data: newExpense });
    } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Update expense by id
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, amount } = req.body;

      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).json({ success: false, message: 'Expense not found' });
      }

      expense.name = name;
      expense.amount = amount;
      await expense.save();

      res.status(200).json({ success: true, data: expense });
    } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Delete expense by id
  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Expense.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Expense not found' });
      }

      res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = expenseController;
