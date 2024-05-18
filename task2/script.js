document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseTable = document.getElementById('expense-table');
    const categorySummary = document.getElementById('category-summary');
    let expenses = [];
    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        const expense = { id: Date.now(), amount: parseFloat(amount), category, date };
        expenses.push(expense);
        updateExpenseTable();
        updateCategorySummary();
        expenseForm.reset();
    });

    function updateExpenseTable() {
        expenseTable.innerHTML = '';
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editExpense(${expense.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            `;
            expenseTable.appendChild(row);
        });
    }

    function updateCategorySummary() {
        const summary = {};
        expenses.forEach(expense => {
            if (!summary[expense.category]) {
                summary[expense.category] = 0;
            }
            summary[expense.category] += expense.amount;
        });

        categorySummary.innerHTML = '';
        for (const category in summary) {
            const li = document.createElement('li');
            li.textContent = `${category}: ${summary[category].toFixed(2)}`;
            categorySummary.appendChild(li);
        }
    }

    window.editExpense = function (id) {
        const expense = expenses.find(exp => exp.id === id);
        if (expense) {
            document.getElementById('amount').value = expense.amount;
            document.getElementById('category').value = expense.category;
            document.getElementById('date').value = expense.date;
            deleteExpense(id);
        }
    };

    window.deleteExpense = function (id) {
        expenses = expenses.filter(exp => exp.id !== id);
        updateExpenseTable();
        updateCategorySummary();
    };
});
