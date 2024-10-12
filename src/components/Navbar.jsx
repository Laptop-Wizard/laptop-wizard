import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <ul>
            <li><a>Chat Bot</a></li>
            <li><a>Technical Assistance</a></li>
            <li><a>Contact Us</a></li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar