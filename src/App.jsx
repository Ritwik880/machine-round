import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Timer from './Components/Timer'
import PasswordGenerator from './Components/PasswordGenerator'
import MovieSearch from './Components/MovieSearch'
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Timer />}></Route>
        <Route path='/password-generator' element={<PasswordGenerator />}></Route>
        <Route exact path='/movies' element={<MovieSearch />}></Route>
      </Routes>
    </>
  )
}

export default App