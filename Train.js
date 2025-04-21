document.addEventListener('DOMContentLoaded', () => {
    // Price list for different destinations (in rupees per person for Sleeper class)
    const stationPrices = {
        Mumbai: 500,
        Delhi: 800,
        WestBengal: 1000,
        Chennai: 900,
        KoSealdahlkata: 950,
        Kolkata: 1100,
        Bangalore: 1200,
        Kanpur: 850,
        Secunderabad: 950,
        Patna: 700,
        Ahmedabad: 600,
        Lucknow: 750,
        Bhopal: 650,
        Jaipur: 700,
        Thiruvananthapuram: 1300,
        Pune: 550,
        Madurai: 1000,
        Guwahati: 1400,
        Varanasi: 800,
        Visakhapatnam: 1200
    };

    // Multiplier for different travel classes
    const classMultipliers = {
        Sleeper: 1,
        ThirdAC: 1.5,
        SecondAC: 2,
        FirstAC: 3,
        SecondSeating: 0.75
    };

    const storedName = localStorage.getItem('name');

    if (storedName) {
        const loginButton = document.querySelector('.Login');
        const signupButton = document.querySelector('.Sign');
        const contactButton = document.querySelector('.Contact');

        loginButton.textContent = storedName;
        loginButton.onclick = null;
        signupButton.textContent = 'Logout';
        signupButton.onclick = () => logoutUser();
        contactButton.style.display = 'inline-block';
    }

    function logoutUser() {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');
        window.location.href = 'EZTrip.html';
    }

    // Handle booking option changes
    function handleBookingOption() {
        const bookingOptions = document.querySelectorAll('input[name="option"]');
        const ticketInfo = document.querySelector('.ticket-info');

        bookingOptions.forEach(option => {
            option.addEventListener('change', (event) => {
                const selectedOption = event.target;

                if (selectedOption.checked) {
                    if (selectedOption.nextSibling.textContent.trim() === 'Book Train Tickets') {
                        ticketInfo.style.display = 'block';
                    } else {
                        ticketInfo.style.display = 'none';
                        alert(`You selected: ${selectedOption.nextSibling.textContent}`);
                    }
                }
            });
        });
    }

    // Handle station selection, class change, and number of travelers change to display price
    function handlePriceCalculation() {
        const toStationSelect = document.querySelector('.To');
        const travellersSelect = document.querySelector('.travellers1');
        const classSelect = document.querySelector('#class');

        const priceDisplay = document.createElement('div');
        priceDisplay.classList.add('price-display');
        priceDisplay.style.marginTop = '10px';
        priceDisplay.style.color = 'red';
        priceDisplay.style.backgroundColor = 'transparent';  // Transparent background
        document.querySelector('.tict').prepend(priceDisplay); // Place above the Get Ticket button

        function updatePrice() {
            const selectedStation = toStationSelect.value;
            const travellersCount = parseInt(travellersSelect.value);
            const selectedClass = classSelect.value;
            const basePrice = stationPrices[selectedStation];

            if (basePrice) {
                const multiplier = classMultipliers[selectedClass] || 1;
                const totalPrice = basePrice * travellersCount * multiplier;
                priceDisplay.textContent = `Estimated Price: ₹${totalPrice}`;
            } else {
                priceDisplay.textContent = 'Price not available';
            }
        }

        toStationSelect.addEventListener('change', updatePrice);
        travellersSelect.addEventListener('change', updatePrice);
        classSelect.addEventListener('change', updatePrice);

        updatePrice(); // Call on page load to show the price for the default selection
    }

    // Handle Get Ticket button click
    function handleGetTicket() {
        const getTicketButton = document.querySelector('.getTicket');

        getTicketButton.addEventListener('click', () => {
            const from = document.querySelector('.Mumbai').value;
            const to = document.querySelector('.To').value;
            const date = document.querySelector('#Date').value;
            const trainClass = document.querySelector('#class').value;
            const travellersCount = document.querySelector('.travellers1').value;

            if (from && to && date) {
                generateTicket(from, to, date, trainClass, travellersCount);

                // Hide the Get Ticket button after generating the ticket
                getTicketButton.style.display = 'none';
            } else {
                displayError('Please fill in all the fields.');
            }
        });
    }

    // Generate ticket details
    function generateTicket(from, to, date, trainClass, travellersCount) {
        const ticketContainer = document.createElement('div');
        ticketContainer.classList.add('ticket-container');
        ticketContainer.style.border = '1px solid #000';
        ticketContainer.style.padding = '20px';
        ticketContainer.style.marginTop = '20px';
        ticketContainer.style.backgroundColor = '#f9f9f9';

        const totalPrice = stationPrices[to] * classMultipliers[trainClass] * travellersCount;

        let ticketDetails = `
            <h2>Train Booking Ticket</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>To:</strong> ${to}</p>
            <p><strong>Travel Date:</strong> ${date}</p>
            <p><strong>Class:</strong> ${trainClass}</p>
            <p><strong>Travellers:</strong> ${travellersCount}</p>
            <p><strong>Seat No.:</strong>XX</p>
            <p><strong>Total Price:</strong> ₹${totalPrice}</p>`;

        ticketContainer.innerHTML = ticketDetails;

        clearTicket();
        document.querySelector('.tict').appendChild(ticketContainer);
        clearErrorMessage();
    }

    // Display error message
    function displayError(message) {
        clearErrorMessage();

        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            document.querySelector('.tict').appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    // Clear error message
    function clearErrorMessage() {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Clear existing ticket
    function clearTicket() {
        const existingTicket = document.querySelector('.ticket-container');
        if (existingTicket) {
            existingTicket.remove();
        }
    }

    // Initialize functions
    handleBookingOption();
    handlePriceCalculation();
    handleGetTicket();
});
