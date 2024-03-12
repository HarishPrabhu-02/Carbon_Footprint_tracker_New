document.addEventListener("DOMContentLoaded", function() {
  const vehicleModelSelect = document.getElementById('vehicle-model');
  const distanceValueInput = document.getElementById('distance-value');
  const distanceUnitSelect = document.getElementById('distance-unit');
  const calculateButton = document.getElementById('calculate-button');

  calculateButton.addEventListener('click', () => {
    if (!vehicleModelSelect.value) {
      alert("Please select a vehicle model.");
      return;
    }

    if (!distanceValueInput.value) {
      alert("Please enter the distance traveled.");
      return;
    }

    if (!distanceUnitSelect.value) {
      alert("Please select a distance unit.");
      return;
    }

    const vehicleModelId = vehicleModelSelect.value;
    const distanceValue = distanceValueInput.value;
    const distanceUnit = distanceUnitSelect.value;

    localStorage.setItem('vehicleModel', vehicleModelId);
    localStorage.setItem('distanceValue', distanceValue);
    localStorage.setItem('distanceUnit', distanceUnit);

    window.location.href = 'results1.html';
  });
});
