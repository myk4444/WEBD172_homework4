// Get the Load Destinations button
const loadDestinationsButton = document.getElementById("loadDestinations");

// Get the area where all destinations will appear
const destinationsOutput = document.getElementById("destinations");

// Get the form used to search for one destination
const destinationForm = document.getElementById("destinationForm");

// Get the destination ID input
const destinationIdInput = document.getElementById("destinationId");

// Get the area where one destination result will appear
const destinationResult = document.getElementById("destinationResult");


// Reusable function that creates the HTML for one destination
function displayDestination({ id, name, location, description }) {
  return `
    <article class="course">
      <h3>${name}</h3>
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p>${description}</p>
    </article>
  `;
}


// When the Load Destinations button is clicked,
// fetch ALL destinations from the Express API
loadDestinationsButton.addEventListener("click", async () => {
  const response = await fetch("/api/destinations");
  const destinations = await response.json();

  // Map over each destination and display it on the page
  destinationsOutput.innerHTML = destinations
    .map(destination => displayDestination(destination))
    .join("");
});


// When the Find Destination form is submitted
destinationForm.addEventListener("submit", async event => {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get the ID entered by the user
  const id = destinationIdInput.value;

  // Fetch ONE destination by its ID
  const response = await fetch(`/api/destinations/${id}`);

  // Convert the response into JSON
  const data = await response.json();

  // If the destination was not found, show the error message
  if (!response.ok) {
    destinationResult.innerHTML = `
      <p class="error">${data.message}</p>
    `;
    return;
  }

  // If found, display the destination
  destinationResult.innerHTML = displayDestination(data);
});