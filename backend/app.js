const dotenv = require('dotenv')
const express=require('express')
const app = express();

dotenv.config({path:'./.env'})
const PORT = process.env.PORT;
require('./db/conn')

// To Import the User Schema We Use 
// const User= require('./db')


// To convert the Data in JSON
app.use(express.json())


// Linked the Router File 
app.use(require('./router/auth'))


// MiddleWare
const middleware =(req,res, next)=>{
console.log("Hello My Middleware");
next();
} 


app.listen(PORT, ()=>{
    console.log(`Server is Running on port number ${PORT}`)
})