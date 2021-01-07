import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav>
    <div className="navbar">

      <Link className="navbutton" to="/crypto-index">Home</Link>
      <Link className="navbutton" to="/crypto-index/CryptoTracker">Crypto Tracker</Link>
      <Link className="navbutton" to="/crypto-index/Crypto">Crypto</Link>
      <Link className="navbutton is-warning" to="/crypto-index/Forex">Forex</Link>
      {/* 
      <Link className="navbutton" to="/project-2/Login">Login</Link>
      <Link className="navbutton" to="/project-2/Login">Sign up</Link>
      */}
    </div>
  </nav>
}

export default Navbar