import React from 'react'
import profileicon from "../assets/weui_contacts-filled.png"
import "./Card.scss"

function Card() {
  return (
    <div className='card'>
        <div className='card-icon'>
            <img src={profileicon} />
        </div>
        <div className='card-description'>
            <h3>Hidden fields</h3>
            <p>Include data in your form URL to segment your user and use its data directly in your form.</p>
        </div>
    </div>
  )
}

export default Card