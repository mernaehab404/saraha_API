import express from 'express'
import UserRouter from './src/modules/user/user.routes.js'
import { dbConnection } from './database/dbConnection.js'
import messageRouter from './src/modules/message/message.routes.js'
import { sendMail } from './src/Email/email.js'
const app = express()

const port= 3000
app.use(express.json())
app.use('/auth',UserRouter)
app.use('/note',messageRouter)

app.get('/',(req,res)=> res.send('helloooo'))
app.listen(port,()=> console.log(`listening on port${port}!`))