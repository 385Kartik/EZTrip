document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in by checking if 'name' exists in localStorage
    const storedName = localStorage.getItem('name');

    if (storedName) {
        // User is logged in, update the navbar
        const loginButton = document.querySelector('.Login');
        const signupButton = document.querySelector('.Sign');
        const contactButton = document.querySelector('.Contact');

        // Change the text content of the login button to the user's name
        loginButton.textContent = storedName;

        // Disable the onclick behavior for the login button
        loginButton.onclick = null;

        // Update the Sign Up button to be the Logout button
        signupButton.textContent = 'Logout';
        signupButton.onclick = () => {
            logoutUser();
        };

        // Ensure the contact button remains unchanged
        contactButton.style.display = 'inline-block';
    }

    // Function to handle user logout
    function logoutUser() {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');
        window.location.href = 'EZTrip.html';
    }

    // Function to handle the "Get Ticket" button click
    function handleGetTicket() {
        const getTicketButton = document.querySelector('.getTicket');

        getTicketButton.addEventListener('click', () => {
            const from = document.querySelector('#from').value; // From input
            const to = document.querySelector('#to').value; // To input
            const departureDate = document.querySelector('#departureDate').value; // Departure date
            const returnDate = document.querySelector('#returnDate').value; // Return date
            const pickupTime = document.querySelector('#pickupTime').value; // Pickup time
            const dropTime = document.querySelector('#dropTime').value; // Drop time

            // Basic validation to ensure required fields are filled
            if (from && to && departureDate && pickupTime) {
                generateTicket(from, to, departureDate, returnDate, pickupTime, dropTime);
            } else {
                displayError('Please fill in all required fields (From, To, Departure Date, and Pickup Time).');
            }
        });
    }

    // Function to generate ticket display
    function generateTicket(from, to, departureDate, returnDate, pickupTime, dropTime) {
        const ticketContainer = document.createElement('div');
        ticketContainer.classList.add('ticket-container');
        ticketContainer.style.border = '1px solid #000';
        ticketContainer.style.padding = '20px';
        ticketContainer.style.marginTop = '20px';
        ticketContainer.style.backgroundColor = '#f9f9f9';

        // Create ticket details
        let ticketDetails = `
            <h2>Cab Booking Ticket</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>To:</strong> ${to}</p>
            <p><strong>Departure Date:</strong> ${departureDate}</p>
            <p><strong>Return Date:</strong> ${returnDate || 'N/A'}</p>
            <p><strong>Pickup Time:</strong> ${pickupTime}</p>
            <p><strong>Drop Time:</strong> ${dropTime || 'N/A'}</p>`;

        ticketContainer.innerHTML = ticketDetails;

        // Clear previous ticket if any
        clearTicket();
        document.querySelector('.tict').appendChild(ticketContainer);

        // Hide the Get Ticket button and any error messages
        const getTicketButton = document.querySelector('.getTicket');
        getTicketButton.style.display = 'none'; // Hide Get Ticket button
        clearErrorMessage(); // Clear any existing error messages
    }

    // Function to calculate and display price dynamically
    function handlePriceCalculation() {
        const fromInput = document.querySelector('#from');
        const toInput = document.querySelector('#to');

        fromInput.addEventListener('input', updatePrice);
        toInput.addEventListener('input', updatePrice);
    }

    // Function to update the price based on From and To inputs
    function updatePrice() {
        const from = document.querySelector('#from').value;
        const to = document.querySelector('#to').value;

        // Validate From and To inputs
        if (from && to && from !== to) {
            const price = calculatePrice(from, to);
            displayPrice(price);
        } else {
            displayPrice(0); // Display 0 if invalid or same locations
        }
    }

    // Mock function to calculate the price (you can replace this with actual logic)
    function calculatePrice(from, to) {
        const basePrice = 300; // Base price in Rupees
        const distanceFactor = 100; // Example price factor for distance
        return basePrice + distanceFactor; // Simple price calculation
    }

    // Function to display the price in red
    function displayPrice(price) {
        let priceContainer = document.querySelector('.price-display');
        if (!priceContainer) {
            priceContainer = document.createElement('div');
            priceContainer.classList.add('price-display');
            document.querySelector('.tict').appendChild(priceContainer);
        }
        priceContainer.textContent = `Price: ₹${price.toFixed(2)}`;
        priceContainer.style.color = 'red'; // Set the price color to red
        priceContainer.style.marginTop = '10px';
        priceContainer.style.fontWeight = 'bold';
    }

    // Function to display an error message
    function displayError(message) {
        clearErrorMessage();

        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.style.color = 'red';
            errorDiv.style.backgroundColor = 'transparent';
            errorDiv.style.marginTop = '10px';
            document.querySelector('.tict').appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    // Function to clear previous error messages
    function clearErrorMessage() {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove(); // Remove previous error messages
        }
    }

    // Function to clear previous ticket
    function clearTicket() {
        const existingTicket = document.querySelector('.ticket-container');
        if (existingTicket) {
            existingTicket.remove(); // Remove previous ticket
        }
    }

    // Initialize functions
    handleGetTicket();
    handlePriceCalculation(); // Attach price calculation logic
});
