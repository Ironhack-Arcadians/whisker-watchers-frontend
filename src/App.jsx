import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import SignupForm from './components/signup';
import LoginForm from './components/login';

function App() {


  return (
    <>
     <Navbar />

     <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
