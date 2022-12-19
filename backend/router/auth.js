const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const authentication = require('../middleware/authentication')


require('../db/conn')

router.get('/', (req, res)=>{
    res.send(`'Hellow world from the server Auth.js'`)
});


// Contact Page 
router.post ('/contact',authentication, async (req, res)=>{
    try{
        const {name,email,message}=req.body;
        if(!name || !email || !message){
            console.log("Please Fill The Data")
            return res.json({error:"Please Fill the Contact Form"})
        }
        const userContact = await User.findOne({_id:req.userID})
        if(userContact){
            const userMessage = await userContact.addMessage(name,email,message);
            await userContact.save();
            res.status(201).json({message: "User Contacted Successfully"})
        }
        // console.log(userMessage, "HIGI")
    } catch(err){
        console.log(err)
    }
});

router.get('/contactdata',authentication,  (req, res) => {
    res.send(req.rootUser);
});


// About Page API 
router.get('/about',authentication,  (req, res) => {
    // res.cookie("Test", 'himanshu')
    console.log("Hello")
    res.send(req.rootUser);
});

// Register Page API 
router.post('/register', async (req, res)=>{
    const {name, email, phone, occupation, password ,cpassword}= req.body;
    if(!name || !email || !phone || !occupation ||!password || !cpassword){
       return res.status(422).json({error: "Please Fill The Fields Properly"}) 
    } 
    try{
    const emailExist = await User.findOne({email: email})
        if(emailExist){
            return res.status(422).json({error: "Email Already Exist"}) 
        } else if (password !== cpassword){
            return res.status(422).json({error: "Password and Confirm Password Not Matched"})
        }else{
        const user= new User({name, email, phone, occupation, password ,cpassword});
        await user.save();
            res.status(201).json({message:"User Registered Successfully"})}
    }catch(err) {
        console.log(err);
    }
});

// Signin Router
router.post('/login', async(req,res)=>{
    try{
        let token;
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({error: "Please Fill the Data"}) 
         }
        // console.log("Hello Data", req.body);
        const Login= await User.findOne({email:email});
        if(Login){
            const isMatch = await bcrypt.compare(password, Login.password)
             token = await Login.generateAuthToken();
            console.log(token , "Hello" );
            res.cookie("jwtoken", token, {
               expires:new Date(Date.now() + 25892000000),
               httpOnly:true  
            }) 
            if(!isMatch){
                res.status(400).json({error: "InValid Credentials"});
            }else{
                res.json({message: "Logged In"});
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        }
       
    }
    catch(err){
        console.log(err, "hell")
    }
});

// Logout All the Users 
router.get('/logout',  (req, res) => {
    // res.send(req.rootUser);
    res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send('User Logout');
});

// Getting all the Users
router.get('/user',async (req,res)=>{
    let Hello= await User.find()
    if(Hello.length>0){
        res.send(Hello)
    }
    else{
        res.send({result: "No User found"})
    }
}  )


// To Delete the Users 
router.delete('/deluser/:id', async(req, res)=>{
    try{
    let result = await User.deleteOne({_id:req.params.id})
    res.status(200).send(result)
    }
    catch(err){
        res.status(400).send({Error: err})
    }
})

// To Edit the users 
router.get('/gettinguserdata/:id', async(req, res)=>{
    try{
    let result = await User.findOne({_id:req.params.id})
    res.status(200).send(result)
    }
    catch(err){
        res.status(400).send({Error: err})
    }
})

// To Update the users 
router.post('/updateusers/:id', async(req, res)=>{
    try{
    let result = await User.updateOne({_id:req.params.id, $set:req.body})
    res.status(200).send(result)
    }
    catch(err){
        res.status(400).send({Error: err})
    }
})



module.exports= router;
