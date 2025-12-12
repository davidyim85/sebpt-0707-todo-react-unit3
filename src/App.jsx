import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));

  const logIn = data => {
    localStorage.setItem('token', data);
    setUser(data);
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setUser('');
  }



  return (
    <>
      <Navbar signOut={signOut} user={user} />
      <Routes>
        <Route path="/" element={<h2>Sign In Or Sign Up</h2>} />
        <Route path="/signup" element={<SignUp logIn={logIn} />} />
        <Route path="/signin" element={<SignIn logIn={logIn} />} />
        {user && <Route path="/home" element={<Home user={user}/>} />}
        <Route path="*" element={<h2>Whoops, nothing here!</h2>} />
      </Routes>
    </>
  )
}

export default App
