import './App.css'
import Footer from './components/Footer'
import Sidebar from './components/SideBar'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Cadastro/Cadastro'
import Hunts from './pages/Hunts/Hunts'
import Events from './pages/Events/Events'
import CreateHunt from  './pages/CreateHunt/CreateHunt'
import MyHunts from './pages/MyHunts/MyHunts'
import SavedHunts from './pages/SavedHunts/SavedHunts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='/hunts' element={<Hunts />} />
          <Route path='/events' element={<Events />} />
          <Route path='/createhunt' element={<CreateHunt/>} />
          <Route path='/myhunts' element={<MyHunts/>} />
          <Route path='/savedhunts' element={<SavedHunts/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
