import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav>
    <div className="navbar">

      <Link className="navbutton" to="/crypto-tracker">Home</Link>
      <Link className="navbutton" to="/crypto-tracker/all">Market Tracker</Link>
      <Link className="navbutton" to="/crypto-tracker/crypto">Exchange</Link>
      {/* 
      <Link className="navbutton" to="/project-2/Login">Login</Link>
      <Link className="navbutton" to="/project-2/Login">Sign up</Link>
      */}
    </div>
  </nav>
}

export default Navbar