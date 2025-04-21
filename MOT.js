document.addEventListener('DOMContentLoaded', () => {
    // Ticket button for fetching price
    const ticketButton = document.querySelector('.getTicket');
    const priceDisplay = document.createElement('div'); // Create a div to display the price
    priceDisplay.classList.add('price-display'); // Add a class for custom styling
    priceDisplay.style.fontSize = '0.9em'; // Set font size for the price display
    ticketButton.parentNode.insertBefore(priceDisplay, ticketButton); // Insert the price display above the button
    
    // Create a div for the ticket display
    const ticketDisplay = document.createElement('div');
    ticketDisplay.classList.add('ticket-display'); // Add the class for styling
    document.body.appendChild(ticketDisplay); // Append the ticket display to the body

    // Get references to the travellers and class select elements
    const travellerSelect = document.getElementById('Adult');
    const classSelect = document.getElementById('Class');

    // Event listeners for changes in travellers and class
    travellerSelect.addEventListener('change', calculateTicketPrice);
    classSelect.addEventListener('change', calculateTicketPrice);

    // Initial calculation to set default price
    calculateTicketPrice();

    // Event listener for clicking the "Get Ticket" button
    ticketButton.addEventListener('click', () => {
        const ticketInfo = generateTicket(); // Generate ticket details
        ticketDisplay.innerHTML = ticketInfo; // Display ticket information
        ticketDisplay.style.display = 'block'; // Show the ticket display
        ticketButton.style.display = 'none'; // Hide the Get Ticket button
    });

    function calculateTicketPrice() {
        // Get Trip Type (One Way, Round Trip, or Multi City)
        const tripType = document.querySelector('input[name="trip-type"]:checked').id;

        // Get Departure Date and calculate the time difference from today
        const departureDate = new Date(document.getElementById('departure').value);
        const today = new Date();
        const daysUntilDeparture = Math.floor((departureDate - today) / (1000 * 60 * 60 * 24));

        // Get Travellers & Class information
        const numTravellers = parseInt(travellerSelect.value); // Directly get the value from select
        const travelClass = classSelect.value; // Get selected class

        // Set a base price for the ticket based on the travel class
        let basePrice = 1000; // Initial base price for Economy class

        // Adjust base price based on the selected class
        switch (travelClass) {
            case 'PremiumEconomy':
                basePrice = 1200; // Base price for Premium Economy
                break;
            case 'Business':
                basePrice = 2000; // Base price for Business
                break;
            case 'FirstClass':
                basePrice = 3000; // Base price for First Class
                break;
            default:
                basePrice = 1000; // Default to Economy if no match
                break;
        }

        // Price adjustment based on Trip Type
        if (tripType === 'roundtrip') {
            basePrice *= 1.8; // 80% more for round trip
        } else if (tripType === 'multicity') {
            basePrice *= 2.5; // 150% more for multi-city
        }

        // Adjust price based on the number of days until departure
        if (daysUntilDeparture < 7) {
            basePrice *= 1.5; // 50% more expensive if departure is within a week
        } else if (daysUntilDeparture < 30) {
            basePrice *= 1.2; // 20% more expensive if within a month
        }

        // Price adjustment based on number of travellers
        const totalPrice = basePrice * numTravellers;

        // Display the calculated price in Indian Rupees
        priceDisplay.innerHTML = `<p>Your estimated ticket price is: ₹${totalPrice.toFixed(2)}</p>`;
    }

    function generateTicket() {
        // Get Trip Type (One Way, Round Trip, or Multi City)
        const tripType = document.querySelector('input[name="trip-type"]:checked').id;
        
        // Get Departure and Arrival Locations
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        // Get Departure Date
        const departureDate = document.getElementById('departure').value;

        // Get Travellers information
        const numTravellers = parseInt(travellerSelect.value); 
        const travelClass = classSelect.value;

        // Generate random seat number (for simplicity, using 1-50 range)
        const seatNumber = Math.floor(Math.random() * 50) + 1;

        // Construct the ticket information
        return `
            <div class="ticket">
                <h3>Ticket Details</h3>
                <p>From: ${from}</p>
                <p>To: ${to}</p>
                <p>Departure Date: ${departureDate}</p>
                <p>Class: ${travelClass}</p>
                <p>Number of Travellers: ${numTravellers}</p>
                <p>Seat Number: ${seatNumber}</p>
            </div>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toField = document.getElementById('to');

    // Retrieve the selected country from localStorage
    const selectedCountry = localStorage.getItem('selectedCountry');

    // If a country was selected, update the "To" field
    if (selectedCountry) {
        toField.value = selectedCountry;
    }

    // Continue with other functionality for the page
    // (Existing ticket price calculation and other logic)
});
