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
      <Route exact path="/crypto-tracker/Crypto" component={Crypto} />
      <Route exact path="/crypto-tracker/CryptoTracker" component={CryptoTracker} />
      <Route exact path="/crypto-tracker/Forex" component={Forex} />
      <Route exact path="/crypto-tracker/Login" component={Login} />      
      <Route exact path="/crypto-tracker" component={Home} />
    </Switch>
  </BrowserRouter>
}

export default App 

