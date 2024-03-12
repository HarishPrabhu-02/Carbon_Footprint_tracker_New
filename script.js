// Function to open the disclaimer modal and apply blur effect
function openDisclaimer() {
  const modal = document.getElementById('disclaimer-modal');
  const background = document.querySelector('.blur-background');
  modal.style.display = 'block';
  background.style.display = 'block';
}


// Function to handle agreement with disclaimer
function agreeDisclaimer() {
  closeDisclaimer(); // Close the disclaimer modal
  // Additional actions can be added here if needed
}

// Function to close the disclaimer modal and remove blur effect
function closeDisclaimer() {
  const modal = document.getElementById('disclaimer-modal');
  modal.style.display = 'none';
  document.body.classList.remove('blur'); // Remove blur effect from body
}

// Call openDisclaimer() function when page is loaded
window.onload = openDisclaimer;

// Event listener for "I understand & Agree" button
const agreeButton = document.getElementById('disclaimer-modal').querySelector('.btn-warning');
agreeButton.addEventListener('click', agreeDisclaimer);

// Event listener for "Track Now" button
document.getElementById('track-button').addEventListener('click', () => {
  window.location.href = 'calemissions.html';
});
