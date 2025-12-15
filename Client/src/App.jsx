import './App.css'
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import NewInfo from './Components/NewInfo';
import EditInfo from './Components/EditInfo';

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/Info_Website' element={<Home />}/>
        <Route path='/new' element={<NewInfo />}/>
        <Route path='/edit' element={<EditInfo />}/>
      </Routes>
    </div>
  )
}

export default App
