import React, {useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Logout = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
         axios.get('/logout',{
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
         }).then((res)=>{
            dispatch({type:"USER", payload:false})
            navigate('/login')
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
         }).catch((err)=>{
            console.log(err)
            })
    })
  return (
    <>
      <h1>Logged Out </h1>
    </>
  )
}

export default Logout
