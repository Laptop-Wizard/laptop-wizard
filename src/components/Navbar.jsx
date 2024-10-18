import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
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