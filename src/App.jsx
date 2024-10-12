import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div id='main-container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/signup' element={<Signup />} /> */}
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
