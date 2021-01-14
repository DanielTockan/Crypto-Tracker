import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const [crypto, updateCrypto] = useState([])
  const [loading, updateLoading] = useState([])
  const [x, updateX] = useState(0)

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=5&page=1&sparkline=false`)
      .then(resp => {
        const data = resp.data
        updateCrypto(data)
        updateLoading(false)
      })
  }, [autoSlide])

  const slide = () => {

    if (x > -400) {
      updateX(x - 100)
    } else {
      updateX(0)
    }
    console.log(x);
  }

  const autoSlide = setInterval(slide, 9000)

  const goLeft = () => {
    x === 0 ? updateX(-100 * (crypto.length - 1)) : updateX(x + 100)
  }

  const goRight = () => {
    x === -100 * (crypto.length - 1) ? updateX(0) : updateX(x - 100)
  }

  if (loading) return <h1>LOADING...</h1>

  return <div>
    <h1 className="centre" >Today's top 5 coins</h1>

    <div className="slider">
      {crypto && crypto.map((crypto, index) => {
        return <div
          style={{ transform: `translateX(${x}%)` }}
          key={index}
          className="slide">
          <Link
            className="remove-hyperlink"
            to={`/crypto-tracker/${crypto.id}`}>
            <img className="home-symbol" src={crypto.image} alt={crypto.id} />
          </Link>
          <Link
            className="remove-hyperlink"
            to={`/crypto-tracker/${crypto.id}`}>
            <div><h1 className="h-coin" >{crypto.id}</h1></div>
          </Link>
        </div>
      })}
      <button id="goLeft" onClick={goLeft} >{arrowL}</button>
      <button id="goRight" onClick={goRight} >{arrowR}</button>
    </div>
  </div>
}

export default Home

const arrowR = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
</svg>

const arrowL = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
</svg>