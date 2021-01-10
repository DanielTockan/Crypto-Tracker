import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const initialState = [
  'BTC',
  'ETH',
  'USDT',
  'XRP',
  'BCH',
  'BNB',
  'LTC',
  'DOT',
  'BSV',
  'NEO',
  'GBP',
  'USD',
  'EUR',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNH'

]

const initialState2 = [
  'GBP',
  'USD',
  'EUR',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNH'
]

const Exchange = () => {
  const [cryptoCurrencies, updateCryptoCurrencies] = useState(initialState)
  const [currencies, updateCurrencies] = useState(initialState2)
  const [baseCurrency, updateBaseCurrency] = useState('')
  const [exchangeRate, updateExchangeRate] = useState('')
  const [amount, updateAmount] = useState('')

  const fetch = (currency2) => {
    updateExchangeRate("Loading ...")
    axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${currency2}&apikey=PKAPG80ELUH9O8CR`)
      .then(resp => {
        console.log(resp.data)
        updateExchangeRate(resp.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
      })
  }
  return <div className="crypto-background">
    <body className="crypt">
      <div className="cryptobody">
        <h1>Cryptocurrency converter</h1>
        <input className="forexinput"
          placeholder='Enter amount here:'
          onChange={(event) => updateAmount(event.target.value)}
        >
        </input>
        <select
          className="cryptoinput"
          onChange={(event) => updateBaseCurrency(event.target.value)}
        >
          <option className="option">Base currency...</option>
          {cryptoCurrencies.map((currency, index) => {
            return <option className="option" key={index} value={currency}>{currency}</option>
          })}
        </select>
        <select
          className="cryptoinput"
          onChange={(event) =>
            fetch(event.target.value)
          }
        >
          <option className="option">Quote currency...</option>
          {currencies.map((currency, index) => {
            return <option className="option" key={index} value={currency}>{currency}</option>
          })}
        </select>
        <div> Exchange rate is: {exchangeRate}</div>
        <div>
          <div> Amount in {baseCurrency} is: {exchangeRate === 'Loading ...' ? 'Loading ...' : exchangeRate * amount}</div>
        </div>
      </div>
    </body>

  </div>
}

export default Exchange