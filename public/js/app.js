let user = {
    gender: null,
    age: null,
    height: null,
    weight: null,
    goal: null
};

function login() {
    user.gender = document.getElementById('gender').value;
    user.age = document.getElementById('age').value;
    user.height = document.getElementById('height').value;
    user.weight = document.getElementById('weight').value;
    user.goal = document.getElementById('goal').value;

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/home';
}

async function scanLabel() {
    const image = await captureImage();
    const result = await fetch('/api/label-analysis', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const analysis = await result.json();

    document.getElementById('preference-meter').innerText = analysis.message;
}

function captureImage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('sampleImageData'); 
        }, 1000);
    });
}
// app.js

// Function to toggle the edit form on the Profile page
function toggleEditForm() {
    const editButton = document.getElementById('edit-button');
    const editForm = document.getElementById('edit-form');

    if (editButton && editForm) {
        editButton.addEventListener('click', () => {
            editForm.classList.toggle('hidden');
        });
    }
}

// Function to handle profile updates on the Profile page
function handleProfileUpdate() {
    const saveButton = document.getElementById('save-button');

    if (saveButton) {
        saveButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            alert('Profile updated successfully!'); // Simulate a successful update
            const editForm = document.getElementById('edit-form');
            if (editForm) editForm.classList.add('hidden'); // Hide the form again
        });
    }
}

// Function to handle subscription actions on the Go Pro page
function handleSubscription() {
    const subscribeButtons = document.querySelectorAll('.subscribe-button');

    subscribeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planName = button.parentElement.querySelector('h3').innerText;
            alert(`You have subscribed to the ${planName} plan!`);
            // Logic to handle subscription can be added here
        });
    });
}

// Function to handle the camera functionality on the Home page
function handleCameraFunctionality() {
    const cameraButton = document.getElementById('camera-button');

    if (cameraButton) {
        cameraButton.addEventListener('click', () => {
            alert('Camera functionality would be activated here!');
            // Logic for activating the camera can be added here
        });
    }
}

// Function to initialize all page functionalities
function initialize() {
    toggleEditForm();           // Initialize the profile editing feature
    handleProfileUpdate();      // Initialize profile update handling
    handleSubscription();       // Initialize subscription handling
    handleCameraFunctionality(); // Initialize camera button handling
}

// Run the initialize function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
