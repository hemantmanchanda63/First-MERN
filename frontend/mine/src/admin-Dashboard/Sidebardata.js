import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import '../admin-Dashboard/dashboard.css'

const Sidebardata = ({children}) => {
    return (
        <>
            <div className='sidebar'>
                {Sidebar.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link to={item.path} style={{ color: "#fff" }}>{item.title}</Link>
                        </div>
                    )
                })}
            </div>
            <main>{children}</main>
        </>
    )
}

export default Sidebardata
