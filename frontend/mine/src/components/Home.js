import React, { useState, useEffect } from 'react'
import "../App.css"
import axios from 'axios'

const Home = () => {
  const [Data, setData] = useState('')
  const { name } = Data;
  const [show, ShowData] = useState(false)

  const userHome = async () => {
    try {
      const result = await axios.get('/contactdata', {
        headers: {
          "Content-Type": "application/json"
        },
      });
      console.log(result.data.name, "Hello")
      setData(result.data)
      ShowData(true)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    userHome()
  }, [])

  return (
    <>
      <div className='homepage text-center'>
        <div className='home-div'>
          <p className='pt-5'>WELCOME</p>
          <h1>{name}</h1>
          <h2>{show ? 'Happy to See You Back' : 'We are the MERN Developer'}</h2>
        </div>
      </div>
    </>
  )
}

export default Home
