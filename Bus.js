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

    // Function to handle the change in "From" or "To" selection
    function handleLocationChange() {
        const fromSelect = document.getElementById('From');
        const toSelect = document.getElementById('To');

        const fromLocation = fromSelect.value;
        const toLocation = toSelect.value;

        // Validate the input fields
        if (fromLocation && toLocation && fromLocation !== toLocation) {
            // Clear any previous error message
            clearError();

            // Calculate and display the price
            const price = calculatePrice(fromLocation, toLocation);
            displayPrice(price);
        } else {
            displayPrice(0); // If invalid or same location, display 0
        }
    }

    // Function to handle the "Get Ticket" button click
    function handleGetTicket() {
        const fromSelect = document.getElementById('From');
        const toSelect = document.getElementById('To');
        const travelDateInput = document.getElementById('Date');

        const fromLocation = fromSelect.value;
        const toLocation = toSelect.value;
        const travelDate = travelDateInput.value;

        // Validate the input fields
        if (!fromLocation || !toLocation || !travelDate) {
            displayError('Please fill in all fields.');
            return;
        }

        // Check if From and To locations are the same
        if (fromLocation === toLocation) {
            displayError('From and To locations cannot be the same.');
            return;
        }

        // Clear any previous error message
        clearError();

        // Generate the ticket information
        const ticketInfo = {
            from: fromLocation,
            to: toLocation,
            date: travelDate,
            price: calculatePrice(fromLocation, toLocation)
        };

        // Display the ticket in the ticket container
        displayTicket(ticketInfo);
    }

    // Function to calculate the price based on From and To locations
    function calculatePrice(from, to) {
        // Example: you can replace this with a real calculation or fetch from a server
        const basePrice = 500; // Base price in Rupees
        const distanceFactor = 100; // Example price factor for distance

        // Mock pricing logic based on location (you can update this)
        if (from === 'CityA' && to === 'CityB') {
            return basePrice + 3 * distanceFactor;
        } else if (from === 'CityB' && to === 'CityC') {
            return basePrice + 5 * distanceFactor;
        } else {
            return basePrice + 2 * distanceFactor;
        }
    }

    // Function to display the price
    function displayPrice(price) {
        const priceContainer = document.querySelector('.price-display');
        if (priceContainer) {
            priceContainer.textContent = `Price: ₹${price.toFixed(2)}`;
        } else {
            const newPriceContainer = document.createElement('div');
            newPriceContainer.className = 'price-display';
            newPriceContainer.textContent = `Price: ₹${price.toFixed(2)}`;
            document.body.appendChild(newPriceContainer);
        }
    }

    // Function to display error message
    function displayError(message) {
        const errorContainer = document.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.textContent = message;
        } else {
            const newErrorContainer = document.createElement('div');
            newErrorContainer.className = 'error-message';
            newErrorContainer.textContent = message;
            document.body.appendChild(newErrorContainer);
        }
    }

    // Function to clear error message
    function clearError() {
        const errorContainer = document.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.textContent = '';
        }
    }

    // Function to display the ticket
    function displayTicket(ticketInfo) {
        const ticketContainer = document.createElement('div');
        ticketContainer.className = 'ticket-container';

        const ticketDetails = `
            <h4>Ticket Details:</h4>
            <p><strong>From:</strong> ${ticketInfo.from}</p>
            <p><strong>To:</strong> ${ticketInfo.to}</p>
            <p><strong>Date:</strong> ${ticketInfo.date}</p>
            <p><strong>Price:</strong> ₹${ticketInfo.price.toFixed(2)}</p>
        `;

        ticketContainer.innerHTML = ticketDetails;

        // Append the ticket container to the main container or body
        const mainBox = document.querySelector('.mainbox');
        mainBox.appendChild(ticketContainer);
    }

    // Attach event listeners to the "From" and "To" dropdowns
    const fromSelect = document.getElementById('From');
    const toSelect = document.getElementById('To');

    fromSelect.addEventListener('change', handleLocationChange);
    toSelect.addEventListener('change', handleLocationChange);

    // Attach event listener to the "Get Ticket" button
    const getTicketButton = document.querySelector('.getTicket');
    getTicketButton.addEventListener('click', handleGetTicket);
});
