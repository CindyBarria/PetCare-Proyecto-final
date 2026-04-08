require('dotenv').config();
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./routers/users-router');
const petsRouter = require('./routers/pets-router');
const requestRouter = require('./routers/request-router');
const reviewRouter = require('./routers/review-router');

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

/* Middlewares globales */
app.use(cors());

/* Permitimos cuerpos más grandes porque la imagen se envía en base64 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Could not connect to MongoDB:', error));

/* Rutas principales */
app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/requests', requestRouter);
app.use('/reviews', reviewRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});