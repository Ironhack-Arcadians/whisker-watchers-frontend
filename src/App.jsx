import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import SignupForm from './components/signup';
import LoginForm from './components/login';
import About from './pages/About/About'

function App() {


  return (
    <>
     <Navbar />

     <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/about" element={<About />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
