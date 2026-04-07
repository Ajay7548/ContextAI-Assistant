import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRouter from './routes/chat.route.js'
import { initVectors } from "./services/vector.service.js";

dotenv.config()
await initVectors();
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('ContextAI Backend Running')
})

app.use('/chat',chatRouter)
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})