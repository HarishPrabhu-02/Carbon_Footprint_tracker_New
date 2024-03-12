async function fetchEmissionsData() {
  const vehicleModelId = localStorage.getItem('vehicleModel');
  const distanceValue = localStorage.getItem('distanceValue');
  const distanceUnit = localStorage.getItem('distanceUnit');

  function validateRequestData(data) {
    if (!data.data) {
      throw new Error('Missing required data object in request body.');
    }
  
    const { type, distance_unit, distance_value, vehicle_model_id } = data.data;
  
    if (!type || !distance_unit || !distance_value || !vehicle_model_id) {
      throw new Error('Missing required parameter in request data.');
    }
  
    // Add further checks based on API documentation (e.g., data type, format)
    if (typeof distance_value !== 'number' || distance_value < 0) {
      throw new Error('Invalid distance value. Must be a positive number.');
    }
  
    // Check for vehicle_model_id format (assuming a string)
    if (typeof vehicle_model_id !== 'string' || vehicle_model_id.length === 0) {
      throw new Error('Invalid vehicle model ID. Must be a non-empty string.');
    }
  
    // Check distance_unit based on API documentation (assuming specific allowed values)
    const allowedDistanceUnits = ['km', 'mi']; // Replace with actual allowed units
    if (!allowedDistanceUnits.includes(distance_unit)) {
      throw new Error('Invalid distance unit. Allowed values: ' + allowedDistanceUnits.join(', '));
    }
  
    // Parse distance_value as decimal with default of 0
  const distanceValueAsNumber = Number(distanceValue) || 0;

  // Check for parsed value and negative number
  if (isNaN(distanceValueAsNumber) || distanceValueAsNumber < 0) {
    throw new Error('Please provide the distance in decimal value. It cannot be negative.');
  }
  
    return true; // Data is valid
  }

  try {
    const validatedData = validateRequestData({
      data: {
        type: 'vehicle',
        distance_unit: distanceUnit,
        distance_value: distanceValue,
        vehicle_model_id: vehicleModelId
      }
    });
    const response = await fetch('https://www.carboninterface.com/api/v1/estimates', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } 
  catch (error) {
    console.error('Error fetching emissions data:', error);
    // Provide a user-friendly error message:
    alert('Sorry, there was an error fetching emissions data. Please try again.');
    throw error; // Re-throw to allow for further handling if needed
  }
}


fetchEmissionsData()

  .then(data => {
    if (response.ok) {
    console.log("API Data:", data);
    const carbonFootprint = data.data.attributes.carbon_g;
    footprintValueElement.textContent = carbonFootprint + ' grams';

    // Implement logic for generating emission reduction suggestions
    const suggestions = generateEmissionReductionSuggestions(carbonFootprint); // Replace with your logic
    displaySuggestions(suggestions);
    }
    else {
      console.error('Error fetching emissions data:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  })
  .catch(error => {
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    console.error('Network error occurred:', error);
    alert('Sorry, there was a network error. Please try again later.');
  } else if (error.message.startsWith('Missing required')) { // Handle pre-validation errors
    console.error('Error in request data:', error);
    alert('Error: ' + error.message); // Informative message based on error
  } else if (error.response && error.response.status === 422) {
    console.error('API request failed with status 422 (Unprocessable Content):', error);
    const errorData = error.response.json(); // Parse error response if applicable
    alert('The data you provided might be invalid. Please check and try again. ' + 
        (errorData && errorData.message ? 'Error details: ' + errorData.message : ''));
    
    // Additional logic to analyze error details (optional)
    if (errorData && errorData.errors) {
      errorData.errors.forEach(error => {
        console.warn('Specific error:', error);  // Log detailed API error information
        // You can display specific user messages based on error codes/messages
      });
    }
  } else {
    console.error('Unexpected error:', error);
    alert('Sorry, an unexpected error occurred. Please try again later.');
  }
});
function generateEmissionReductionSuggestions(carbonFootprint) {
    const suggestions = [];
  
    // Implement logic to generate suggestions based on carbon footprint
    // This could involve thresholds, footprint categories, or other criteria
  
    if (carbonFootprint < 1000) {
      suggestions.push("You're already doing great! Consider planting a tree for additional carbon capture.");
    } else if (carbonFootprint < 5000) {
      suggestions.push("Try carpooling or using public transportation for some trips.");
    } else {
      suggestions.push("Consider switching to a more fuel-efficient vehicle.");
      suggestions.push("Invest in renewable energy sources for your home.");
    }
    return suggestions;
  }
  const footprintValueElement = document.getElementById('footprint-value');
  const suggestionsListElement = document.getElementById('suggestions-list');
  function displaySuggestions(suggestions) {
    suggestionsListElement.innerHTML = ""; // Clear existing suggestions
  
    if (suggestions.length === 0) {
      suggestionsListElement.textContent = "No suggestions available at this time.";
      return;
    }
  
    const listItems = suggestions.map(suggestion => `<li>${suggestion}</li>`);
    suggestionsListElement.innerHTML = listItems.join("");
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-button').addEventListener('click', fetchEmissionsData);
});
