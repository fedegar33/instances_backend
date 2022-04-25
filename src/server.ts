import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authenticate from './middleware/authenticate'
import { login } from './controllers/login'
import { getAll } from './controllers/ec2instances'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.post('/login', login)

app.get('/ec2instances', authenticate, getAll)

app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`)
})
