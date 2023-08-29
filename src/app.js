// Import necessary dependencies
import express from 'express'
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
const app = express();

// Use the bodyParser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define routes for authentication and monitoring
app.use('/auth', authRoutes); // Route for authentication
app.use('/api', apiRoutes) // Api Routes

export default app;