import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import projectRoutes from './routes/projectRoutes.js'
import { connectToDB } from './config/db.js'

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

connectToDB()


app.use("/api/v1/projects", projectRoutes)




app.get("/", (req, res) => {
    res.send("Welcome to Te_Assignment_2024 Backend")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})