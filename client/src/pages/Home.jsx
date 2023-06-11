import React from 'react';
import Login from '../components/Login';
import NavBar from '../components/Navbar';

function Home() {
  return (
    <div className="App">
      <NavBar/>
      <Login/>
    </div>
  );
}

export default Home;
