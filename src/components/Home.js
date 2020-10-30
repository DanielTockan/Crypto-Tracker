import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  
  const [crypto, updateCrypto] = useState([])
  const [baseCurrency, updateBaseCurrency] = useState('GBP')
  const [resultsPerPage, updateResultsPerPage] = useState('100')


  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=5&page=1&sparkline=false`)
      .then(resp => {
        const data = resp.data
        updateCrypto(data)
        //console.log(data[0])
      })
  }, [baseCurrency, resultsPerPage])

  console.log(baseCurrency)
  console.log(resultsPerPage)

  return <div>
    <body id="home-crypt" className="crypt">
      <div id="home-container" className="container">
        {crypto.map((crypto, index) => {
          return <div id="home-" className="tracker" key={index}>
            <div id="home-coin-row" className="coin-row">
              <div className="coin">
                <img src={crypto.image} alt="" id="home-symbol" className="symbol" />
                <h1 id="home-coin-name" className="coin-name">{crypto.name}</h1>
                <p id="home-ticker" className="ticker">{crypto.symbol.toUpperCase()}</p>
              </div>
              <div id="home-coin-details" className="coin-details">
                <p id="home-coin-price" className="coin-price">£{crypto.current_price.toLocaleString()}</p>
                <p id="home-volume" className="volume">£{crypto.total_volume.toLocaleString()}</p>
                {crypto.price_change_percentage_24h < 0 ? (
                  <p id="home-price-change" className="price-change red">{crypto.price_change_percentage_24h.toFixed(2)}%</p>
                ) :
                  (<p id="home-price change" className="price-change green">{crypto.price_change_percentage_24h}%</p>)}
                <p id="home-market-cap" className="market-cap">Mkt Cap: £{crypto.market_cap.toLocaleString()}</p>
              </div>
            </div>
          </div>
        
      })}
      </div>
    </body>

  </div>
}

export default Home