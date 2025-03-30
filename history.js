// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const dateFrom = document.getElementById('date-from');
const dateTo = document.getElementById('date-to');
const transactionType = document.getElementById('transaction-type');
const amountMin = document.getElementById('amount-min');
const amountMax = document.getElementById('amount-max');
const resetFilterBtn = document.querySelector('.reset-filter-btn');
const applyFilterBtn = document.querySelector('.apply-filter-btn');
const exportBtn = document.querySelector('.export-btn');
const paginationBtns = document.querySelectorAll('.pagination-btn');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Set default date values
const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

dateTo.valueAsDate = today;
dateFrom.valueAsDate = thirtyDaysAgo;

// Reset filter button
resetFilterBtn.addEventListener('click', () => {
    dateFrom.valueAsDate = thirtyDaysAgo;
    dateTo.valueAsDate = today;
    transactionType.value = 'all';
    amountMin.value = '';
    amountMax.value = '';
});

// Apply filter button
applyFilterBtn.addEventListener('click', () => {
    // In a real application, this would filter the data
    // For demo purposes, just show an alert
    alert('Filters applied successfully!');
});

// Export button
exportBtn.addEventListener('click', () => {
    const exportOptions = ['PDF', 'CSV', 'Excel'];
    const option = prompt(`Choose export format:\n1. ${exportOptions[0]}\n2. ${exportOptions[1]}\n3. ${exportOptions[2]}`);
    
    if (option && !isNaN(option) && option >= 1 && option <= 3) {
        alert(`Exporting transactions as ${exportOptions[option-1]}...`);
    }
});

// Pagination
paginationBtns.forEach(btn => {
    if (!btn.disabled) {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            paginationBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // In a real application, this would load the corresponding page
            // For demo purposes, just scroll to top of table
            document.querySelector('.transaction-table').scrollIntoView({ behavior: 'smooth' });
        });
    }
});