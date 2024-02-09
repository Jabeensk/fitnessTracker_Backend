require('./localEnv.js');

// Require dependencies
const { conn } = require('./db/conn.js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Call conn function
conn();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
