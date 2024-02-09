// Require mongoose package
const mongoose = require('mongoose');

// Define conn function
async function conn() {
    try {
        // Connect to MongoDB using ATLAS_URI from environment variables
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
}

// Export conn function
module.exports = { conn };
