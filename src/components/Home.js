import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const [crypto, updateCrypto] = useState([])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=5&page=1&sparkline=false`)
      .then(resp => {
        const data = resp.data
        updateCrypto(data)
      })
  }, [])

  console.log(crypto.image)

  const goLeft = () => {
    x === 0 ? updateX(-100 * (crypto.length - 1)) : updateX(x + 100)
  }

  const goRight = () => {
    x === -100 * (crypto.length - 1) ? updateX(0) : updateX(x - 100)
  }

  const [x, updateX] = useState(0)


  return <div>
    <h1>For a look for the whole market tracker, click <a href="https://danieltockan.github.io/crypto-tracker/CryptoTracker">here</a></h1>
    <h1>Today's top 5 coins.</h1>

    <div className="slider">
      {crypto.map((crypto, index) => {
        return <div
          style={{ transform: `translateX(${x}%)` }}
          key={index}
          className="slide">
          <Link
            className="remove-hyperlink"
            to={`/Index/${crypto.id}`}>
            <img className="home-symbol" src={crypto.image} alt={crypto.id} />
          </Link>
          <Link
            className="remove-hyperlink"
            to={`/Index/${crypto.id}`}>
            <div><h1 className="h-coin" >{crypto.id}</h1></div>
          </Link>
        </div>
      })}
      <button id="goLeft" onClick={goLeft} >left</button>
      <button id="goRight" onClick={goRight} >right</button>
    </div>
  </div>
}

export default Home