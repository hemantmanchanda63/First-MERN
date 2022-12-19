import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"
import {UserContext} from '../App'

const Login = () => {
  const {state,dispatch} = useContext(UserContext);

  const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const navigate = useNavigate();
 const [data, setData] = useState({
  email:"",
  password:""
 })
 const {email,password}=data;

//  console.log(data)

  const handleChange = (e) =>{
    const {name,value}=e.target
    setData({...data, [name]:value})
  }
  const handleSubmit= async(e) =>{
    e.preventDefault();
    if(!email || !password){
      alert("Please Fill the Data ")
    }
    else if(!regex.test(email)){
      alert("Email is Not Valid ")
    }

    else{
    const response= await axios.post('/login',{
      email,password
    },{
      headers: {
        "Content-Type":"application/json"
      }
    })
    if(response.status==200){
      console.log("response", response)
      dispatch({type:"USER", payload:true})
      alert("Login Successfull")
      navigate('/')
    }
    else{
      alert("Invalid Credentials")
      console.log(response.data.error)
    }
  }}


  return (
    <>
      <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="hell" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form method='POST' onSubmit={handleSubmit}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg" name='email' value={email} onChange={handleChange} />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={handleChange} name="password" />
                    <label className="form-label" >Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <Link to="/signup"
                      style={{color: "#393f81"}}>Register here</Link></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>

                </form>

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

export default Login
