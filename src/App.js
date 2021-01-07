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
      <Route exact path="/crypto-index/Crypto" component={Crypto} />
      <Route exact path="/crypto-index/CryptoTracker" component={CryptoTracker} />
      <Route exact path="/crypto-index/Forex" component={Forex} />
      <Route exact path="/crypto-index/Login" component={Login} />      
      <Route exact path="/crypto-index" component={Home} />
    </Switch>
  </BrowserRouter>
}

export default App 

