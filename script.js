const contactForm = document.getElementById('contactForm');
const webAppURL = 'https://script.google.com/macros/s/AKfycbwB9MGxhpZorbsP9if5jtfMBmYW_1f8-57uvbPR6Qc/dev'; // Replace with your Web App URL

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from reloading the page

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Send data to Google Apps Script (Web App)
        fetch(webAppURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(`Thank you for reaching out, ${name}! I will respond to your message shortly.`);
                contactForm.reset(); // Reset the form after submission
            } else {
                alert('An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
}
