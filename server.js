const express = require('express');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

// Helper function to generate random email, username, and password
const generateRandomUser = () => {
    return {
        email: `${generateRandomString(8)}@example.com`,
        username: generateRandomString(8),
        password: generateRandomString(12)
    };
};

// Function to create a user
const createUser = async () => {
    const fetch = (await import('node-fetch')).default;
    const user = generateRandomUser();

    try {
        const response = await fetch('https://assignment-w4rp.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User created:', data);
        } else {
            console.error('Error creating user:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Schedule the task to run every 30 minutes
cron.schedule('*/30 * * * *', () => {
    console.log('Creating a new user...');
    createUser();
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

