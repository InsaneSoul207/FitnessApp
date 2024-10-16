// Import Tesseract.js library for OCR
import Tesseract from 'tesseract.js';

// Sample user data (this would come from the user's profile)
const userProfile = {
    gender: 'female',
    age: 25,
    height: 165, // in cm
    weight: 60,  // in kg
    goal: 'muscle gain', // could be 'fat loss', 'muscle gain', 'maintenance'
};

// Nutritional guidelines based on user goals
const nutritionGuidelines = {
    'muscle gain': {
        maxFat: 15,
        minProtein: 20,
        maxCarbs: 40,
        maxCalories: 500,
    },
    'fat loss': {
        maxFat: 10,
        minProtein: 15,
        maxCarbs: 20,
        maxCalories: 300,
    },
    'maintenance': {
        maxFat: 20,
        minProtein: 10,
        maxCarbs: 50,
        maxCalories: 600,
    }
};

// Function to analyze the nutritional label based on user goals
function analyzeLabel(nutritionalInfo) {
    const goal = userProfile.goal;
    const guidelines = nutritionGuidelines[goal];

    let feedback = '';

    // Analyze fat
    if (nutritionalInfo.fat > guidelines.maxFat) {
        feedback += 'High fat content!\n';
    }

    // Analyze protein
    if (nutritionalInfo.protein < guidelines.minProtein) {
        feedback += 'Low protein content!\n';
    }

    // Analyze carbs
    if (nutritionalInfo.carbs > guidelines.maxCarbs) {
        feedback += 'High carb content!\n';
    }

    // Analyze calories
    if (nutritionalInfo.calories > guidelines.maxCalories) {
        feedback += 'Too many calories!\n';
    }

    return feedback || 'This product aligns with your goal!';
}

// Function to extract text using Tesseract.js
function extractTextFromImage(image) {
    return Tesseract.recognize(image, 'eng', {
        logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
        return text;
    });
}

// Function to simulate nutritional info parsing from OCR result (adjust to your real case)
function parseNutritionalInfo(ocrText) {
    // Here you would extract fat, protein, carbs, and calories from the OCR text
    // For simplicity, this is just a mock extraction process

    return {
        fat: 12,       // Extracted from OCR
        protein: 25,   // Extracted from OCR
        carbs: 30,     // Extracted from OCR
        calories: 400, // Extracted from OCR
    };
}

// Function to handle the label scan process
function handleLabelScan() {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const cameraButton = document.getElementById('camera-button');
    const analysisResult = document.getElementById('analysis-result');

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();

            // Add video element to the page to show the camera preview
            document.body.appendChild(video);

            cameraButton.addEventListener('click', () => {
                // Capture the frame from the video stream
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Stop the video stream once the image is captured
                video.pause();
                stream.getTracks()[0].stop();

                // Extract the text using OCR (Tesseract.js)
                const capturedImage = canvas.toDataURL('image/png');
                extractTextFromImage(capturedImage).then((ocrText) => {
                    console.log('Extracted Text:', ocrText);
                    const nutritionalInfo = parseNutritionalInfo(ocrText);
                    const feedback = analyzeLabel(nutritionalInfo);

                    // Display analysis result
                    analysisResult.innerText = feedback;
                });
            });
        })
        .catch((err) => {
            console.error('Error accessing the camera: ', err);
        });
}

// Initialize the scan functionality
function initializeLabelAnalysis() {
    const cameraButton = document.getElementById('camera-button');
    if (cameraButton) {
        handleLabelScan(); // Bind scan functionality to button
    }
}

// Run the initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeLabelAnalysis);
