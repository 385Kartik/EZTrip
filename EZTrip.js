document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in by checking if 'name' exists in localStorage
    const storedName = localStorage.getItem('name');

    if (storedName) {
        // User is logged in, update the navbar

        // Get the reference to the Login and Sign Up buttons
        const loginButton = document.querySelector('.Login');
        const signupButton = document.querySelector('.Sign');

        if (loginButton && signupButton) {
            // Change the text content of the login button to the user's name
            loginButton.textContent = storedName; // Set the user's name inside the login button

            // Disable the default onclick behavior for the login button (for example, opening a login form)
            loginButton.onclick = () => {
                // Optionally, redirect to a user profile page or show a user menu
                alert(`Welcome, ${storedName}!`); // Can redirect to a profile page or user account management
            };

            // Update the Sign Up button to become the Logout button
            signupButton.textContent = 'Logout'; // Change text to "Logout"
            signupButton.onclick = () => {
                logoutUser(); // Add logout functionality
            };
        }
    }

    function logoutUser() {
        // Clear user data from localStorage
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');

        // Redirect to home page after logging out
        window.location.href = 'EZTrip.html'; // Assuming 'EZTrip.html' is the home page
    }

    // Search functionality
    const searchInput = document.querySelector('.Search');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            // When the user presses Enter (key code 13), perform search
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevents the default behavior (like form submission)
                handleSearch(searchInput.value.trim().toLowerCase()); // Call search function with trimmed input
            }
        });
    }

    function handleSearch(query) {
        // Define keywords and corresponding pages to redirect
        const searchMap = {
            'home': 'EZTrip.html',
            'contact': 'Contact.html',
            'countries': 'Countries.html',
            'transport': 'MOT.html',
            'offers': 'TI.html',
            'ai booking': 'https://youtu.be/dQw4w9WgXcQ?si=BPJenvDBqObCMmMa',
            'manual booking': 'MOT.html',
            'support': 'Contact.html',
        };

        // Check if the query matches one of the keywords
        if (query in searchMap) {
            // Redirect to the corresponding page
            window.location.href = searchMap[query];
        } else {
            alert('No results found for your search.'); // Alert if no match is found
        }
    }

});
