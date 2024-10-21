import React from 'react'
import "./Banner.scss"
import robotgif from "../assets/robot.gif"

function Banner() {
  return (
    <section id='banner'>
        <div>
            {/* <h1>Welcome to Laptop-Wizard</h1> */}
            <h1>
            Your hardware concerns, solved with expert guidance.
            </h1>
            <button>GET STARTED</button>
        </div>
        <img src={robotgif}/>
    </section>
  )
}

export default Banner