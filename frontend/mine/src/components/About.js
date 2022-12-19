import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const[data,setData]=useState({});
const AboutPage=async()=>{
  try{
    const result= await axios.get('/about',{
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json"
      },
      credentials:"include"
    });
    console.log(result.data)
    setData(result.data)
     if(!result.status==200){
      const error = new Error(result.error)
      throw error;
    } 
  } catch(err){
    console.log(err)
    navigate('/login')
  }
} 

  useEffect(()=>{
    AboutPage();
  },[])
  return (
    <>
      <form method='GET'>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="hell" /><span className="font-weight-bold">{data.name}</span><span className="text-black-50">{data.email}</span><span> </span></div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12"><label className="labels">Name</label><input type="text" className="form-control" placeholder="Name" value={data.name} disabled /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Mobile Number</label>
                <input type="text" className="form-control" placeholder="enter phone number" value={data.phone} disabled /></div>
                
                <div className="col-md-12"><label className="labels">Email ID</label>
                <input type="text" className="form-control" placeholder="enter email id" value={data.email} disabled /></div>
                <div className="col-md-12"><label className="labels">Occupation</label>
                <input type="text" className="form-control" placeholder="Occupation" value={data.occupation}  disabled /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Phone</label>
                <input type="text" className="form-control" placeholder="Phone" value={data.phone} disabled  /></div>
              </div>
              <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Edit Details</button></div>
            </div>
          </div>
          </div>
        </div>
        </form>
      {/* </div>
    </div> */}
    </>
  )
}

export default About
