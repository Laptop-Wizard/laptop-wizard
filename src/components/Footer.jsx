import React from 'react'
import "./Footer.scss"

function Footer() {
  return (
    <div id='footer'>
        <div className='footer-column'>
            <p className='footer-title'>Made by Team</p>
        </div>
        {/* <div className='footer-column'>
            <p className='footer-title'>Product</p>
            <ul>
                <li>Status</li>
                <li>Documentation</li>
                <li>Roadmap</li>
                <li>Pricing</li>
            </ul>
        </div>
        <div className='footer-column'>
            <p className='footer-title'>Community</p>
            <ul>
                <li>Status</li>
                <li>Documentation</li>
                <li>Roadmap</li>
                <li>Pricing</li>
            </ul>
        </div> */}
        <div className='footer-column'>
            <p className='footer-title'>Company</p>
            <ul>
                <li>Status</li>
                <li>Documentation</li>
                <li>Roadmap</li>
                <li>Pricing</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer