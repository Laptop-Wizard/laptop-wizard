import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import FeatureSection from '../components/FeatureSection'
import Footer from '../components/Footer'
import "./Home.scss"
import home1 from "../assets/home1.png"
import home2 from "../assets/home2.png"

function Home() {
  return (
    <div id='home-container'>
      <Navbar />
      <Banner />
      <section className='section'>
          <img src={home1} />
          <div>
              <h2>AI-Enhanced Personalized Support</h2>
              <p>
                Get instant assistance with our AI-powered chatbot, ready to troubleshoot your laptop issues in real-time!
              </p>
              <button>Try it now</button>
          </div>
      </section>
      <section className='section' style={{'flexDirection': 'row-reverse'}}>
          <img src={home2} />
          <div>
              <h2>Integration with Local Services</h2>
              <p>
                Get instant laptop support and connect to local repair centers for hands-on help when needed. Virtual troubleshooting meets real-world solutions!
              </p>
              <button>Try it now</button>
          </div>
      </section>
      <FeatureSection />
      <Footer />
    </div>
  )
}

export default Home