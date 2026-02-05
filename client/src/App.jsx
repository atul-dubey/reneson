import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import GoogleCalender from './components/GoogleCalender'
import { useData } from './context/DataContext'

function App() {

  const {showScheduler}=useData();

  return (
    <>
      {showScheduler && <GoogleCalender/>}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
