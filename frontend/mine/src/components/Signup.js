import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    password: "",
    cpassword: ""
  })
  const { name, email, phone, occupation, password, cpassword } = user;

  const handleinputs = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const submitData = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !occupation || !password || !cpassword) {
      alert("Please Fill the Data First")
    }
    else if(!regex.test(email)){
      alert("Email is Not Valid ")
    }
    else if (password !== cpassword) {
      alert("password and Confirm Password Not Matched")
    }

    else {
      const result = await axios.post('/register', {
        name, email, phone, occupation, password, cpassword
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (result.status == 201) {
        alert("registration Successfull")
        console.log("Result", result);
        navigate('/login')
      }
      else if (result.status == 422) {
        console.log("Invalid Details")
        alert("Invalid Details")
      }
    }
  }
  // console.log(user,"hifi")


  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11 mt-5">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form method='POST' className="mx-1 mx-md-4" onSubmit={submitData}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" placeholder='Name' id="form3Example1c"
                              name='name' className="form-control" autoComplete='off' value={name} onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example3c" className="form-control" placeholder='Email' name='email' 
                            
                            value={email}
                             onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example4c" className="form-control"
                              name='phone' placeholder='Phone' value={phone} onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example4cd" className="form-control" placeholder='Occupation' name='occupation' value={occupation} onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="pass" className="form-control"
                              name='password' placeholder='Password' value={password} onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="conpass" className="form-control"
                              name='cpassword' placeholder='Confirm Password' value={cpassword} onChange={handleinputs} />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sampleimage" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
