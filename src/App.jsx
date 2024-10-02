import './App.scss'
import Navbar from './components/Navbar'
import native from "./assets/native-feeling1.png"
import builder from "./assets/builder-dnd1.png"
import Banner from './components/Banner'

function App() {
  return (
    <div id='main-container'>
      <Navbar />
      <Banner />
      <section className='section'>
          <img src={native} />
          <div>
              <h2>Easy building experience</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, aut adipisci esse officiis cupiditate repellat accusamus ea labore ratione reiciendis debitis, minus beatae. Esse aut veniam ut necessitatibus omnis cum magni commodi doloremque corporis.</p>
              <button>Try it now</button>
          </div>
      </section>
      <section className='section' style={{'flexDirection': 'row-reverse'}}>
          <img src={builder} />
          <div>
              <h2>Easy building experience</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, aut adipisci esse officiis cupiditate repellat accusamus ea labore ratione reiciendis debitis, minus beatae. Esse aut veniam ut necessitatibus omnis cum magni commodi doloremque corporis.</p>
              <button>Try it now</button>
          </div>
      </section>
    </div>
  )
}

export default App
