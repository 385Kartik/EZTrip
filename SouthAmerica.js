// This script should be added to all pages with a navbar, except the login page
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in by checking if 'name' exists in localStorage
    const storedName = localStorage.getItem('name');

    if (storedName) {
        // User is logged in, update the navbar

        // Get the reference to the Login and Sign Up buttons
        const loginButton = document.querySelector('.Login');
        const signupButton = document.querySelector('.Sign');
        const contactButton = document.querySelector('.Contact');

        // Change the text content of the login button to the user's name
        loginButton.textContent = storedName; // Set the user's name inside the login button

        // Disable the onclick behavior for the login button so it doesn't act as a login button
        loginButton.onclick = null; // Remove any login functionality

        // Update the Sign Up button to be the Logout button
        signupButton.textContent = 'Logout'; // Change text to "Logout"
        signupButton.onclick = () => {
            logoutUser(); // Add logout functionality
        };

        // Ensure the contact button remains unchanged
        contactButton.style.display = 'inline-block';
    }

    function logoutUser() {
        // Clear user data from localStorage
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');

        // Redirect to home page after logging out
        window.location.href = 'EZTrip.html'; // Redirect to the home page
    }
});
