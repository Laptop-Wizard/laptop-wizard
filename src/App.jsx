import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Chatbot from './pages/Chatbot';
import Support from './pages/Support';
import TechRegister from './pages/TechRegister';

function App() {
  return (
    <BrowserRouter>
      <div id='main-container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/support' element={<Support />} />
        <Route path='/tech-register' element={<TechRegister />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
