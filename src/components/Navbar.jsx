import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import logo from "../assets/logo2.png"

function Navbar() {
  return (
    <nav>
        <img src={logo} alt="" />
        <h2>Laptop Wizard</h2>
        <ul>
            <li>
              <Link to="/chatbot">Chatbot</Link>
            </li>
            <li>
              <Link to="/support">Technical Assistance</Link>
            </li>
            <li><a>Contact Us</a></li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar