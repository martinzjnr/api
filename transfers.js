// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const transferOptions = document.querySelectorAll('.transfer-option');
const transferForm = document.querySelector('.transfer-form');
const fromAccount = document.getElementById('from-account');
const toAccount = document.getElementById('to-account');
const recipientName = document.getElementById('recipient-name');
const bankName = document.getElementById('bank-name');
const transferAmount = document.getElementById('transfer-amount');
const transferCurrency = document.getElementById('transfer-currency');
const transferDescription = document.getElementById('transfer-description');
const saveRecipient = document.getElementById('save-recipient');
const cancelBtn = document.querySelector('.cancel-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const quickSendBtns = document.querySelectorAll('.quick-send-btn');
const manageRecipientsBtn = document.querySelector('.view-all-btn');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Transfer options
transferOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Highlight selected option
        transferOptions.forEach(opt => opt.style.borderColor = '');
        option.style.borderColor = 'var(--accent-gold)';
        
        // Scroll to form
        document.querySelector('.transfer-form-card').scrollIntoView({ behavior: 'smooth' });
        
        // Update form based on selected option
        const optionTitle = option.querySelector('h3').textContent;
        document.querySelector('.transfer-form-card .card-title h3').textContent = optionTitle;
        
        // Clear form
        transferForm.reset();
    });
});

// Quick send buttons
quickSendBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Get recipient details
        const recipientElement = btn.closest('.recipient-item');
        const recipientNameText = recipientElement.querySelector('h4').textContent;
        const recipientAccountText = recipientElement.querySelector('.recipient-account').textContent;
        
        // Fill form with recipient details
        toAccount.value = recipientAccountText.split(' - ')[1].replace('****', '');
        recipientName.value = recipientNameText;
        bankName.value = recipientAccountText.split(' - ')[0];
        
        // Scroll to form
        document.querySelector('.transfer-form-card').scrollIntoView({ behavior: 'smooth' });
    });
});

// Cancel button
cancelBtn.addEventListener('click', () => {
    transferForm.reset();
});

// Confirm button
confirmBtn.addEventListener('click', () => {
    // Validate form
    if (!fromAccount.value) {
        alert('Please select a source account');
        return;
    }
    
    if (!toAccount.value) {
        alert('Please enter a destination account');
        return;
    }
    
    if (!recipientName.value) {
        alert('Please enter recipient name');
        return;
    }
    
    if (!bankName.value) {
        alert('Please enter bank name');
        return;
    }
    
    if (!transferAmount.value || parseFloat(transferAmount.value) <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Confirm transfer
    const amount = parseFloat(transferAmount.value);
    const currency = transferCurrency.value.toUpperCase();
    const recipient = recipientName.value;
    
    if (confirm(`Are you sure you want to transfer ${currency} ${amount.toFixed(2)} to ${recipient}?`)) {
        alert('Transfer successful! The funds will be processed shortly.');
        transferForm.reset();
    }
});

// Manage recipients button
manageRecipientsBtn.addEventListener('click', () => {
    alert('This feature is coming soon!');
});