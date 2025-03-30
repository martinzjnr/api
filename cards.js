// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const atmCard = document.querySelector('.atm-card');
const flipCardBtn = document.querySelector('.flip-card-btn');
const freezeBtn = document.querySelector('.freeze-btn');
const replaceBtn = document.querySelector('.replace-btn');
const settingsBtn = document.querySelector('.settings-btn');
const viewAllBtn = document.querySelector('.view-all-btn');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Flip card functionality
flipCardBtn.addEventListener('click', () => {
    atmCard.classList.toggle('flipped');
    
    if (atmCard.classList.contains('flipped')) {
        flipCardBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Show Front';
    } else {
        flipCardBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Flip Card';
    }
});

// Card action buttons
freezeBtn.addEventListener('click', () => {
    if (freezeBtn.textContent.includes('Freeze')) {
        freezeBtn.innerHTML = '<i class="fas fa-snowflake"></i> Unfreeze Card';
        freezeBtn.style.color = '#2196f3';
        freezeBtn.style.borderColor = '#2196f3';
        
        // Show notification
        alert('Your card has been frozen. No transactions will be processed until you unfreeze it.');
    } else {
        freezeBtn.innerHTML = '<i class="fas fa-snowflake"></i> Freeze Card';
        freezeBtn.style.color = '';
        freezeBtn.style.borderColor = '';
        
        // Show notification
        alert('Your card has been unfrozen. You can now use it for transactions.');
    }
});

replaceBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to request a replacement card? Your current card will be deactivated once the new card is issued.')) {
        alert('Your replacement card request has been submitted. You will receive your new card within 5-7 business days.');
    }
});

settingsBtn.addEventListener('click', () => {
    window.location.href = 'settings.html';
});

viewAllBtn.addEventListener('click', () => {
    window.location.href = 'history.html';
});