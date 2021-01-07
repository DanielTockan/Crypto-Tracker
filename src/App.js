import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Forex from './components/Forex'
import Crypto from './components/Crypto'
import CryptoTracker from './components/CryptoTracker'
import Navbar from './components/Navbar'

import './styles/style.scss'


const App = () => {
  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/project-2/Crypto" component={Crypto} />
      <Route exact path="/project-2/CryptoTracker" component={CryptoTracker} />
      <Route exact path="/project-2/Forex" component={Forex} />
      <Route exact path="/project-2/Login" component={Login} />      
      <Route exact path="/crypto-index" component={Home} />
    </Switch>
  </BrowserRouter>
}

export default App 

