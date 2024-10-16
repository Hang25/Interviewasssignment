// Define your Heroku backend URL here
const backendUrl = 'https://your-app-name.herokuapp.com';

// Submit data to the backend
async function submitData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    const data = { name, email, message };

    try {
        const response = await fetch(`${backendUrl}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display data from the backend
async function displayData() {
    try {
        const response = await fetch(`${backendUrl}/data`);
        const data = await response.json();

        const dataTableBody = document.querySelector('#dataTable tbody');
        dataTableBody.innerHTML = ''; // Clear previous data

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.message}</td>
            `;
            dataTableBody.appendChild(row);
        });

        if (data.length === 0) {
            alert("No data available.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}