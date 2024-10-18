import React from 'react'
import Navbar from '../components/Navbar'
import native from "../assets/native-feeling1.png"
import builder from "../assets/builder-dnd1.png"
import Banner from '../components/Banner'
import FeatureSection from '../components/FeatureSection'
import Footer from '../components/Footer'
import "./Home.scss"

function Home() {
  return (
    <div id='home-container'>
      <Navbar />
      <Banner />
      <section className='section'>
          <img src={native} />
          <div>
              <h2>Easy building experience</h2>
              <p>
                All you have to do is drag and drop blocks to create your app. Even if you have custom needs, you can always add custom code.
              </p>
              <button>Try it now</button>
          </div>
      </section>
      <section className='section' style={{'flexDirection': 'row-reverse'}}>
          <img src={builder} />
          <div>
              <h2>Easy building experience</h2>
              <p>
                All you have to do is drag and drop blocks to create your app. Even if you have custom needs, you can always add custom code.
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