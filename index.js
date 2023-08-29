// Import necessary dependencies
import mongoose from "mongoose"; // MongoDB object modeling library
import app from "./src/app.js"; // Express.js application
import dotenv from 'dotenv'; // Load environment variables from .env file
dotenv.config();
const port = process.env.SERVER_PORT;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_DB).then(
    console.log('connected to mongodb')
).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server running at  http://localhost:${port}/`);
}); 