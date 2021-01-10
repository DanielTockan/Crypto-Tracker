import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav>
    <div className="navbar">

      <Link className="navbutton" to="/crypto-tracker">Home</Link>
      <Link className="navbutton" to="/crypto-tracker/all">Crypto Tracker</Link>
      <Link className="navbutton" to="/crypto-tracker/crypto">Crypto</Link>
      <Link className="navbutton is-warning" to="/crypto-tracker/forex">Forex</Link>
      {/* 
      <Link className="navbutton" to="/project-2/Login">Login</Link>
      <Link className="navbutton" to="/project-2/Login">Sign up</Link>
      */}
    </div>
  </nav>
}

export default Navbar