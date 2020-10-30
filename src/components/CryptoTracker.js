import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const CryptoTracker = () => {

  const [crypto, updateCrypto] = useState([])
  const [baseCurrency, updateBaseCurrency] = useState('GBP')
  const [resultsPerPage, updateResultsPerPage] = useState('100')


  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=1&sparkline=false`)
      .then(resp => {
        const data = resp.data
        updateCrypto(data)
        //console.log(data[0])
      })
  }, [baseCurrency, resultsPerPage])

  console.log(baseCurrency)
  console.log(resultsPerPage)

  return <div>
    <body className="crypt">
      <header>
        <div className="header-button"
          onClick={(event) => updateBaseCurrency(event.target.value)}>
          <h5>Choose base currency:</h5>
          <button value="GBP">GBP</button>
          <button value="USD">USD</button>
          <button value="EUR">EUR</button>
          <button value="JPY">JPY</button>
          <button value="CNY">CNY</button>
          <button value="CAD">CAD</button>
          <button value="AUD">AUD</button>
        </div>
        <div className="header-button"
          onClick={(event) => updateResultsPerPage(event.target.value)}>
          <span>
          <h5>Number of results:</h5>
          </span>
          <button value="10">10</button>
          <button value="25">25</button>
          <button value="50">50</button>
          <button value="100">100</button>
          <button value="250">250</button>
        </div>
      </header>
      <div className="container">
        {crypto.map((crypto, index) => {
          return <div className="tracker" key={index}>
            <div className="coin-row">
              <div className="coin">
                <img src={crypto.image} alt="" className="symbol" />
                <h1 className="coin-name">{crypto.name}</h1>
                <p className="ticker">{crypto.symbol.toUpperCase()}</p>
              </div>
              <div className="coin-details">
                <p className="coin-price">Price per coin: {crypto.current_price.toLocaleString()}</p>
                <p className="volume">Volume traded/24h  {crypto.total_volume.toLocaleString()}</p>
                {crypto.price_change_percentage_24h < 0 ? (
                  <p className="price-change red">{crypto.price_change_percentage_24h.toFixed(2)}%</p>
                ) :
                  (<p className="price-change green">{crypto.price_change_percentage_24h}%</p>)}
                <p className="market-cap">Mkt Cap: {crypto.market_cap.toLocaleString()}</p>
              </div>
            </div>
          </div>
        
      })}
      </div>
    </body>

  </div>
}

export default CryptoTracker