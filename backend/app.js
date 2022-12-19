const dotenv = require('dotenv')
const express=require('express')
// const cros = require('cors')
const cookieparser = require('cookie-parser')
const app = express();

app.use(cookieparser())

dotenv.config({path:'./.env'})
const PORT = process.env.PORT;
require('./db/conn')

// To convert the Data in JSON
app.use(express.json())


// Linked the Router File 
app.use(require('./router/auth'))


app.listen(PORT, ()=>{
    console.log(`Server is Running on port number ${PORT}`)
})