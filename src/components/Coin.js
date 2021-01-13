import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'

const Coin = (props) => {

  // Chart Section

  const [cryptoCurrency, setCryptoCurrency] = useState('bitcoin')
  const [baseCurrency, setBaseCurrency] = useState('GBP')
  const [dayRange, setDayRange] = useState('100')

  const [priceData, setPriceData] = useState([])
  const [mCapData, setMCapData] = useState([])
  const [volData, setVolData] = useState([])


  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoCurrency}/market_chart?vs_currency=${baseCurrency}&days=${dayRange}&interval=daily`)
      .then(resp => {
        const data = resp.data
        setPriceData(data.prices)
        setMCapData(data.market_caps)
        setVolData(data.total_volumes)
        console.log(data.prices);
      })
  }, [baseCurrency, cryptoCurrency, dayRange])


  // X & Y co-ordinates for price data
  const priceX = priceData.map(price => {
    return price[0]
  })
  const priceY = priceData.map(price => {
    return price[1]
  })


  // X & Y co-ordinates for mCap data
  const mCapX = mCapData.map(mCap => {
    return mCap[0]
  })
  const mCapY = mCapData.map(mCap => {
    return mCap[1]
  })


  // X & Y co-ordinates for vol data
  const volX = volData.map(vol => {
    return vol[0]
  })
  const volY = volData.map(vol => {
    return vol[1]
  })

  const price = {
    x: priceX,
    y: priceY,
    type: 'scatter',
    mode: 'lines',
    name: 'Price',
    marker: { color: 'green' }
  }

  const mCap = {
    x: mCapX,
    y: mCapY,
    type: 'scatter',
    mode: 'lines',
    name: 'Market Cap',
    marker: { color: 'blue' }
  }

  const vol = {
    x: volX,
    y: volY,
    type: 'scatter',
    mode: 'lines',
    name: 'Volume',
    marker: { color: 'red' }
  }

  // End of Chart Section

  // Rest of coin page

  const coinId = props.match.params.coinId

  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
      .then(res => {
        const data = res.data
        setCoin(data)
        setLoading(false)
        console.log(data);
      })
  }, [])

  if (loading) return <h1>LOADING...</h1>

  return <div className="coin-container">
    <div className="coin-page">

      <div className="side-section">
        <h1>{coin.name}</h1>
        <img className="coin-symbol" src={coin.image.large} alt={coin.name} />
        <h3>Rank: {coin.market_cap_rank}</h3>
        <h3>Price: £ {(coin.market_data.current_price.gbp).toLocaleString()}</h3>
        <h3>Market cap: £ {(coin.market_data.market_cap.gbp).toLocaleString()}</h3>
        <h3>24 h/high: <span className="green">£ {(coin.market_data.high_24h.gbp).toLocaleString()}</span></h3>
        <h3>24 h/low: <span className="red">£ {(coin.market_data.low_24h.gbp).toLocaleString()}</span></h3>
        <h3><span>7-day change: </span><span>{coin.price_change_percentage_24h < 0 ? (
          <span className="red">{(coin.market_data.price_change_percentage_7d_in_currency.gbp).toLocaleString()} %</span>
        ) :
          (<span className="green">{(coin.market_data.price_change_percentage_7d_in_currency.gbp).toLocaleString()} %</span>)}</span></h3>
        <h3><a href={coin.links.homepage}>Official Website</a></h3>
      </div>
      <div className="main-section">
        <div className="main-section-head">
          <header className="dropdown">
            <div className="header-button"
              onClick={(event) => setBaseCurrency(event.target.value)}>
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
              onClick={(event) => setDayRange(event.target.value)}>
              <h5>Number of days:</h5>
              <button value="7">7</button>
              <button value="30">30</button>
              <button value="365">365</button>
            </div>
          </header>
        </div>
        <div
          className="table">
          <Plot
            data={[price, mCap, vol]}
            layout={{ width: 720, height: 420, title: `${baseCurrency} vs ${coin.symbol.toUpperCase()} ${dayRange} day time series <br> (Press key to toggle view) `, yaxis: { range: [0, priceY] }, xaxis: { type: 'date' } }} />
        </div>
        <div className="coin-description">
          <p>{coin.description.en}</p>
        </div>
      </div>
    </div>
  </div >
}

export default Coin