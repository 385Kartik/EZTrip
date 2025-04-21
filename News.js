document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    // Function to fetch travel news
    async function fetchTravelNews() {
        try {
            const apiKey = 'fa42c4fd0f674403b974cc83b3bbfde6'; // Replace with your actual API key
            const response = await fetch(`https://newsapi.org/v2/everything?q=travel&apiKey=${apiKey}`);
            const data = await response.json();

            // Check if articles are available
            if (data.articles.length > 0) {
                // Clear loading message
                newsContainer.innerHTML = '';

                // Display articles
                data.articles.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
                    articleDiv.innerHTML = `
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || 'No description available.'}</p>
                        <p><small>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
                    `;
                    newsContainer.appendChild(articleDiv);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles available at this time.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error loading news articles. Please try again later.</p>';
        }
    }

    // Call the fetch function to get news on page load
    fetchTravelNews();
});
