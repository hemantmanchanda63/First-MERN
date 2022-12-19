import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import '../admin-Dashboard/dashboard.css'
import Editapi from './Editapi'
import Sidebardata from './Sidebardata'



const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [update, setupdate] = useState({
        name: "",
        email: "",
        phone: "",
        occupation: ""
    })
    // console.log(update._id, "Hello Gusy")

    // Getting Users Data in Popup 
    const [Data, setData] = useState([])
    const Hello = async () => {
        await axios.get('/user', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setData(res.data)
        })
    }

    // Delete Users 
    const deluser = async (id) => {
        await axios.delete(`/deluser/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            Hello();
        
    }

    // HandleInputs of Edit API 
    const handleinputs = (e) => {
        const { name, value } = e.target
        setupdate({ ...update, [name]: value })
    }

    // Getting Particular User Data 
    const getData = async (id) => {
        await axios.get(`/gettinguserdata/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setupdate(res.data)
            setOpen(true);
        })

    }

    // Popup Close 
    const onClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        Hello();
    }, [])
    return (
        <>
            <div className="hello">
                    <Sidebardata />                       

                <div className="content">
                    <div className="container pt-5">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Occupation</th>
                                    <th>Email</th>
                                    <th>Operation</th>
                                </tr>

                                {Data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.occupation}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button type='button' onClick={() => deluser(item._id)}>DELETE</button>
                                                <button onClick={() => getData(item._id)} className="editing">EDIT</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Editapi open={open}
                    onClose={onClose}
                    name={update.name}
                    email={update.email}
                    phone={update.phone}
                    occupation={update.occupation}
                    handleinputs={handleinputs}
                    id={update._id}
                    setOpen={setOpen}
                    Hello={Hello}
                />
            </div>
        </>
    )
}

export default Dashboard
