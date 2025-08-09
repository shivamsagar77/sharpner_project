const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAllExpenses);          // GET all expenses
router.post('/', expenseController.createExpense);          // POST new expense
router.put('/:id', expenseController.updateExpense);        // PUT update expense
router.delete('/:id', expenseController.deleteExpense);     // DELETE expense

module.exports = router;
