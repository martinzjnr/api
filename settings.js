// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');
const uploadBtn = document.querySelector('.upload-btn');
const imageUploadOverlay = document.querySelector('.image-upload-overlay');
const saveProfileBtn = document.querySelector('.save-btn');
const cancelProfileBtn = document.querySelector('.cancel-btn');
const updatePasswordBtn = document.querySelector('.update-password-btn');
const setup2faBtn = document.querySelector('.setup-2fa-btn');
const toggleSwitches = document.querySelectorAll('.toggle-switch input');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Settings tabs
settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        settingsTabs.forEach(t => t.classList.remove('active'));
        settingsPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const panelId = `${tab.dataset.tab}-panel`;
        document.getElementById(panelId).classList.add('active');
    });
});

// Profile image upload
uploadBtn.addEventListener('click', () => {
    alert('This feature is coming soon!');
});

imageUploadOverlay.addEventListener('click', () => {
    alert('This feature is coming soon!');
});

// Save profile button
saveProfileBtn.addEventListener('click', () => {
    alert('Profile updated successfully!');
});

// Cancel profile button
cancelProfileBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to discard your changes?')) {
        // In a real application, this would reset the form
        // For demo purposes, just reload the page
        window.location.reload();
    }
});

// Update password button
updatePasswordBtn.addEventListener('click', () => {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    alert('Password updated successfully!');
    
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
});

// Setup 2FA button
setup2faBtn.addEventListener('click', () => {
    alert('Two-factor authentication setup will be available soon!');
});

// Toggle switches
toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', () => {
        const settingName = toggle.closest('.toggle-container').querySelector('span').textContent;
        const status = toggle.checked ? 'enabled' : 'disabled';
        
        alert(`${settingName} has been ${status}`);
    });
});