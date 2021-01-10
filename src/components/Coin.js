import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'

const Coin = (props) => {

  // Chart Section

  const [cryptoCurrency, setCryptoCurrency] = useState('bitcoin')
  const [baseCurrency, setBasecCurrency] = useState('GBP')
  const [dayRange, setDayRange] = useState('100')

  const [priceData, setPriceData] = useState([])
  //  const [priceXValues, setPriceXValues] = useState([])
  //  const [priceYValues, setPriceYValues] = useState([])

  const [mCapData, setMCapData] = useState([])
  //  const [mCapXValues, setMCapXValues] = useState([])
  //  const [mCapYValues, setMCapYValues] = useState([])

  const [volData, setVolData] = useState([])
  //  const [volXValues, setVolXValues] = useState([])
  //  const [volYValues, setVolYValues] = useState([])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoCurrency}/market_chart?vs_currency=${baseCurrency}&days=${dayRange}&interval=daily`)
      .then(resp => {
        const data = resp.data
        setPriceData(data.prices)
        setMCapData(data.market_caps)
        setVolData(data.total_volumes)
        // console.log(data)
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
      })
  }, [])

  const { image, description } = coin

  if (loading) return <h1>LOADING...</h1>

  return <div>

    <div
      className="coin-page">
      <div className="side-section">
        <h1>{coin.name}</h1>
        <img src={coin.image.large} alt="" />
        <p>{coin.description.en}</p>
      </div>
      <div className="main-section">
        <div className="main-section-head">
          <div
            className="dropdown">
            <select className="cryptoinput2" onClick={(event) => setBasecCurrency(event.target.value)}>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="CAD">CAD</option>
              <option value="AUD">CAD</option>
            </select>
            <select className="cryptoinput2" onClick={(event) => setDayRange(event.target.value)}>
              <option value="7">7 day</option>
              <option value="31">Month</option>
              <option value="365">Year</option>
            </select>
          </div>
        </div>
        <div
          className="table">

          <Plot
            data={[
              {
                x: priceX,
                y: priceY,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'green' },
              },
            ]}
            layout={{ width: 720, height: 440, title: `${baseCurrency} vs ${coin.symbol.toUpperCase()} Time Series Plot` }}
          />

        </div>
      </div>
    </div>
  </div>
}

export default Coin