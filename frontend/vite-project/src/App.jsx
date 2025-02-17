import React from 'react'
// import {Button} from 'react-bootstrap'
// import Body from './components/body'
// import { Card } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
     {/* <Login/>
     <Signup/> */}
      
      <Routes>
        <Route path = '/' element={<Login/>}> </Route>
        <Route path = '/signup' element={<Signup/>}> </Route>
        </Routes>
    
    </div>
  )
}

export default App