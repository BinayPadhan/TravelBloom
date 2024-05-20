
function loadAbout() {
    document.getElementById('search-content').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.content').innerHTML = `
            <div class="about-content">
                <h1>ABOUT US</h1>
                <p>Welcome to our company! We are a team of passionate individuals dedicated to providing excellent services/products to our customers. Our mission is to <strong>provide the best experience</strong> for people travelling to different destination around the world.</p>
                <p>Our values include integrity, innovation, customer satisfaction, and teamwork. We believe in <strong>putting our customer first</strong> and working together to achieve our goals.</p>
                <p>Feel free to explore our website to learn more about what we offer!</p>

                <div class="about-team">
                    <h1>Our <br> Team</h1>
                    <div class="team-name">
                        <div class="team-member">
                            <i class="fa-solid fa-user-tie"></i>
                            <h3>John Doe</h3>
                            <p>CEO</p>
                        </div>
                        <div class="team-member">
                            <i class="fa-solid fa-user-tie"></i>
                            <h3>Celina Thomas</h3>
                            <p>Team Lead</p>
                        </div>
                        <div class="team-member">
                            <i class="fa-solid fa-user-tie"></i>
                            <h3>Mike Tyson</h3>
                            <p>Delhivery Head</p>
                        </div>
                </div>
            </div>
        `;
}

function loadContact() {
    document.getElementById('search-content').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.content').innerHTML = `
        <div class="contact-content">
            <h1>CONTACT US</h1>
            <form>
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name" placeholder="Full Name" required><br><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" placeholder="you@example.com" required><br><br>
                <label for="message">Message:</label><br>
                <textarea id="message" name="message" rows="4" required></textarea><br><br>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
}

function loadHome(){
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    document.getElementById('search-content').style.display = 'none';
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-content').style.display = 'none';
    // document.querySelector('.container').style.display = 'block';
}

// Function to handle the search functionality
async function search() {
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
    const query = document.getElementById('search-input').value.toLowerCase();
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();

    let results = [];

    if (query === 'country') {
        data.countries.forEach(country => {
            results.push(...country.cities);
        });
    } else if (query === 'temple') {
        results = data.temples;
    } else if (query === 'beach') {
        results = data.beaches;
    }

    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const resultsDiv = document.getElementById('search-content');
    resultsDiv.innerHTML = ''; // Clear previous results
    resultsDiv.style.display = 'flex';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const resultImage = document.createElement('img');
        resultImage.src = result.imageUrl;
        resultImage.alt = result.name;

        const resultTitle = document.createElement('h2');
        resultTitle.textContent = result.name;

        const horizontalLine = document.createElement('hr');

        const resultDescription = document.createElement('p');
        resultDescription.textContent = result.description;

        resultDiv.appendChild(resultImage);
        resultDiv.appendChild(resultTitle);
        resultDiv.appendChild(horizontalLine);
        resultDiv.appendChild(resultDescription);
        resultsDiv.appendChild(resultDiv);
    });
}