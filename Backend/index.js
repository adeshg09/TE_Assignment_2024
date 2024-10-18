import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import { connectToDB } from './config/db.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());

connectToDB();

app.use("/api/v1/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Te_Assignment_2024 Backend");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
