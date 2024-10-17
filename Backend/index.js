import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import { connectToDB } from './config/db.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;

// Define the allowed origins
const allowedOrigins = [
    'https://te-assignment-2024-frontend.vercel.app',
    'http://localhost:5173'
];

// Dynamic CORS options
const corsOptions = {
    origin: (origin, callback) => {
    
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); 
        } else {
            callback(new Error('Not allowed by CORS')); 
        }
    },
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

connectToDB();

app.use("/api/v1/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Te_Assignment_2024 Backend");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
