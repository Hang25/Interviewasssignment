const backendUrl = 'https://maistorageassignment.onrender.com';

// Submit data to the backend
async function submitData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Submitting data:', { name, email, message });  // Log the submitted data

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
        console.log('POST request sent, awaiting response...');  // Log request sent

        const result = await response.json();
        console.log('Response from server:', result);  // Log the server's response

        alert(result.message);
    } catch (error) {
        console.error('Error during POST request:', error);  // Log any errors
    }
}

// Fetch and display data from the backend
async function displayData() {
    try {
        console.log('Sending GET request to fetch data...');
        const response = await fetch(`${backendUrl}/data`);
        const data = await response.json();
        console.log('Data received from server:', data);  // Log the fetched data

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
        console.error('Error during GET request:', error);  // Log any errors
    }
}