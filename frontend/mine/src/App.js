import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Logout from './components/Logout';
import { initialstate, reducer } from './Reducer/UseReducer';
import Dashboard from './admin-Dashboard/Dashboard';


export const UserContext = createContext();

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/admin' element={<Dashboard />} />

      </Routes>
    </Router>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  )
}
export default App