import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Contact = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Messageerror, setMessage] = useState('')

    const userContact=async()=>{
        try{
          const result= await axios.get('/contactdata',{
            headers:{
              "Content-Type": "application/json"
            },
          });
          console.log(result.data)
          setData(result.data)
           if(!result.status==201){
            const error = new Error(result.error)
            throw error;
          } 
        } catch(err){
          console.log(err)
        }
      } 
    const [Data, setData] = useState({ name: "", email: "", message: "" })
    const { name, email, message } = Data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!name) {
            setName("Please Enter Name")
        }
        if (!email) {
            setEmail("Please Enter Email")
        }
        if (!message) {
            setMessage("Please Enter Messageerror")
        }
        else{
        await axios.post('/contact',{name,email,message},{
            headers:{
                "Content-Type":"application/json"
            },
        })
        
        setData({
            name: "", email: "", message: ""
        })
    } 
    }

    useEffect(() => {
        userContact();
    }, [])

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-3">Contact</h2>
                <form onSubmit={handleSubmit} method="POST" >
                    <div className="mb-3">
                        <TextField name="name" label="Name" 
                        variant="outlined"
                            style={{ width: "100%" }}
                            value={name}
                            onChange={handleChange}
                            helperText={Name}
                            error={Name.length > 0}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField label="Email"
                            name="email"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={email}
                            helperText={Email}
                            error={Email.length > 0}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField label="Message"
                            name="message"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={message}
                            multiline
                            rows={4}
                            helperText={Messageerror}
                            error={Messageerror.length > 0}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Contact Us
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact
