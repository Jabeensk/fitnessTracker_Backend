import './localEnv.js';

import express from 'express';
import morgan from 'morgan';
import {conn} from './db/conn.js'; 
conn();
import cors from 'cors'

import usersRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';
import workoutsRoutes from './routes/workouts.js';

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
console.log(process.env.ATLAS_URI);

app.use('/api/users', usersRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/workouts', workoutsRoutes); 



app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
