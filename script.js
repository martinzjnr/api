// Initial Data
let accountBalance = 57935.7;
const pgkRate = 3.52;
let transactions = [
    { id: 1, type: 'credit', amount: 5000.00, description: 'Salary Deposit', date: '2025-03-25', time: '09:15 AM' },
    { id: 2, type: 'debit', amount: 1250.00, description: 'Rent Payment', date: '2025-03-22', time: '02:30 PM' },
    { id: 3, type: 'credit', amount: 750.00, description: 'Consulting Fee', date: '2025-03-20', time: '11:45 AM' },
    { id: 4, type: 'debit', amount: 320.00, description: 'Grocery Shopping', date: '2025-03-18', time: '05:20 PM' },
    { id: 5, type: 'debit', amount: 89.99, description: 'Subscription', date: '2025-03-15', time: '08:00 AM' }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const transactionList = document.getElementById('transaction-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const debitBtn = document.getElementById('debit-btn');
const creditBtn = document.getElementById('credit-btn');
const debitModal = document.getElementById('debit-modal');
const creditModal = document.getElementById('credit-modal');
const closeDebitModal = document.getElementById('close-debit-modal');
const closeCreditModal = document.getElementById('close-credit-modal');
const cancelDebit = document.getElementById('cancel-debit');
const cancelCredit = document.getElementById('cancel-credit');
const confirmDebit = document.getElementById('confirm-debit');
const confirmCredit = document.getElementById('confirm-credit');
const debitAmount = document.getElementById('debit-amount');
const creditAmount = document.getElementById('credit-amount');
const usdBalanceElement = document.getElementById('usd-balance');
const pgkBalanceElement = document.getElementById('pgk-balance');
const availableBalanceElement = document.getElementById('available-balance');

// Format currency
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Update balance display
function updateBalanceDisplay() {
    usdBalanceElement.textContent = formatCurrency(accountBalance, 'USD');
    pgkBalanceElement.textContent = formatCurrency(accountBalance * pgkRate, 'PGK').replace('PGK', 'K');
    availableBalanceElement.textContent = formatCurrency(accountBalance, 'USD');
}

// Render transactions
function renderTransactions(filter = 'all') {
    transactionList.innerHTML = '';
    
    const filteredTransactions = filter === 'all' 
        ? transactions 
        : transactions.filter(t => t.type === filter);
    
    if (filteredTransactions.length === 0) {
        transactionList.innerHTML = '<div class="no-transactions">No transactions found</div>';
        return;
    }
    
    filteredTransactions.forEach(transaction => {
        const transactionEl = document.createElement('div');
        transactionEl.className = 'transaction-item';
        
        const isCredit = transaction.type === 'credit';
        const iconClass = isCredit ? 'credit-icon' : 'debit-icon';
        const iconType = isCredit ? 'fa-arrow-down' : 'fa-arrow-up';
        const amountClass = isCredit ? 'credit-amount' : 'debit-amount';
        const amountPrefix = isCredit ? '+' : '-';
        
        transactionEl.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon ${iconClass}">
                    <i class="fas ${iconType}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <span class="transaction-date">${transaction.date} • ${transaction.time}</span>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${amountPrefix}${formatCurrency(transaction.amount, 'USD')}
            </div>
        `;
        
        transactionList.appendChild(transactionEl);
    });
}

// Handle tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTransactions(button.dataset.tab);
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Modal handlers
debitBtn.addEventListener('click', () => {
    debitAmount.value = '';
    debitModal.style.display = 'flex';
});

creditBtn.addEventListener('click', () => {
    creditAmount.value = '';
    creditModal.style.display = 'flex';
});

closeDebitModal.addEventListener('click', () => {
    debitModal.style.display = 'none';
});

closeCreditModal.addEventListener('click', () => {
    creditModal.style.display = 'none';
});

cancelDebit.addEventListener('click', () => {
    debitModal.style.display = 'none';
});

cancelCredit.addEventListener('click', () => {
    creditModal.style.display = 'none';
});

// Handle debit transaction
confirmDebit.addEventListener('click', () => {
    const amount = parseFloat(debitAmount.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (amount > accountBalance) {
        alert('Insufficient funds');
        return;
    }
    
    accountBalance -= amount;
    
    // Add new transaction
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    transactions.unshift({
        id: transactions.length + 1,
        type: 'debit',
        amount: amount,
        description: 'Withdrawal',
        date: dateStr,
        time: timeStr
    });
    
    // Update UI
    updateBalanceDisplay();
    renderTransactions('all');
    
    // Close modal
    debitModal.style.display = 'none';
});

// Handle credit transaction
confirmCredit.addEventListener('click', () => {
    const amount = parseFloat(creditAmount.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    accountBalance += amount;
    
    // Add new transaction
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    transactions.unshift({
        id: transactions.length + 1,
        type: 'credit',
        amount: amount,
        description: 'Deposit',
        date: dateStr,
        time: timeStr
    });
    
    // Update UI
    updateBalanceDisplay();
    renderTransactions('all');
    
    // Close modal
    creditModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === debitModal) {
        debitModal.style.display = 'none';
    }
    if (e.target === creditModal) {
        creditModal.style.display = 'none';
    }
});

// Initialize
updateBalanceDisplay();
renderTransactions('all');
