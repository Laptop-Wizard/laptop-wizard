import React from 'react'
import usericon from "../assets/user.png"
import phone from "../assets/phone.png"
import email from "../assets/email.png"
import help from "../assets/help.png"

function TechnicianCard() {
    const technicianInfo = [
        {
            username: "Rakesh Dharne",
            contact: "+91 8285764663",
            email: "rakeshbdhar103@gmail.com"
        },
    ]
    return (
        <div className='technician-card'>
            <div className='banner'>
                <div className='circle'>
                    <img src={usericon} alt="" />
                </div>
            </div>
            <div className='technician-info'>
                <h3>Technician Name</h3>
                <p>Working at Dell</p>
                {technicianInfo.map((info, index) => {
                    return (
                        <div className="info-container" key={index}>
                            <div className='info-grid'>
                                <img src={usericon} alt="" />
                                <p>Username</p>
                                <p>{info.username}</p>
                            </div>
                            <div className='info-grid'>
                                <img src={phone} alt="" />
                                <p>Contact</p>
                                <p>{info.contact}</p>
                            </div>
                            <div className='info-grid'>
                                <img src={email} alt="" />
                                <p>E-mail</p>
                                <p>{info.email}</p>
                            </div>
                        </div>
                    );
                })}
                <div className="help">
                    <img src={help} alt="" />
                    <h5>Help and Feedback</h5>
                </div>
            </div>
        </div>
    )
}

export default TechnicianCard