import React, { useState } from 'react'
import "./Support.scss"
import TechnicianCard from '../components/TechnicianCard'
import usericon from "../assets/user.png"
import search from "../assets/search.png"
import Navbar from '../components/Navbar'

function Support() {
    const [cards,setCards] = useState([
        {
            name: "rakesh dharne",
            company: "dell"
        }, 
        {
            name: "shailendra mahadule",
            company: "asus"
        },
        {
            name: "shailendra mahadule",
            company: "asus"
        }, 
        {
            name: "shailendra mahadule",
            company: "asus"
        },
        {
            name: "rakesh dharne",
            company: "dell"
        }, 
        {
            name: "shailendra mahadule",
            company: "asus"
        },
        {
            name: "shailendra mahadule",
            company: "asus"
        }, 
        {
            name: "shailendra mahadule",
            company: "asus"
        }
    ])
    return (
        <>
        <Navbar/>
        <div id='support-container'>
            <div id="searchbar">
                <img src={search} alt="" />
                <input type="text" placeholder='Search City' />
            </div>
            <div class='card-grid'>
                {cards.map((card,index) => <TechnicianCard key={index} 
                />)}
            </div>
        </div>
        </>
    )
}

export default Support