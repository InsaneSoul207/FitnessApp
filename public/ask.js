async function fetchDieticians() {
    try {
        const response = await fetch('https://api.example.com/dieticians'); // Replace with your API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dieticians:', error);
    }
}

// Modify the render function to call fetchDieticians
async function renderDieticians() {
    const dieticianList = document.getElementById('dietician-list');
    const dieticians = await fetchDieticians(); // Fetch dieticians from the API
    dieticians.forEach(dietician => {
        const card = document.createElement('div');
        card.className = 'dietician-card';
        card.innerHTML = `
            <h2>${dietician.name}</h2>
            <p>Specialty: ${dietician.specialty}</p>
            <p>Price: ${dietician.price}</p>
            <button class="chat-button">Chat Now</button>
        `;
        dieticianList.appendChild(card);
    });
}
