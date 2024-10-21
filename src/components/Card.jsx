import React from 'react'
import profileicon from "../assets/weui_contacts-filled.png"
import "./Card.scss"

function Card({heading,content}) {
  return (
    <div className='card'>
        <div className='card-icon'>
            <img src={profileicon} />
        </div>
        <div className='card-description'>
            <h3>{heading}</h3>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default Card