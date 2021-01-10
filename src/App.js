import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Forex from './components/Forex'
import Crypto from './components/Crypto'
import CryptoTracker from './components/CryptoTracker'
import Navbar from './components/Navbar'

import './styles/style.scss'


const App = () => {
  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/crypto-tracker/crypto" component={Crypto} />
      <Route exact path="/crypto-tracker/all" component={CryptoTracker} />
      <Route exact path="/crypto-tracker/forex" component={Forex} />
      <Route exact path="/crypto-tracker" component={Home} />
    </Switch>
  </BrowserRouter>
}

export default App 

