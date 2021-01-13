import React, { useState, useEffect } from 'react'
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
  return <div className="exchange-background">
    <body className="crypt-2">
      <div className="exchangebody">
        <h1>Currency converter</h1>
        <p>I would like to buy</p>
        <input className="exchangeinput"
          placeholder='Enter amount here:'
          onChange={(event) => updateAmount(event.target.value)}
        >
        </input>
        <select
          className="exchangeinput"
          onChange={(event) => updateBaseCurrency(event.target.value)}
        >
          <option className="option">Base currency...</option>
          {cryptoCurrencies.map((currency, index) => {
            return <option className="option" key={index} value={currency}>{currency}</option>
          })}
        </select>
        <p>With...</p>
        <select
          className="exchangeinput"
          onChange={(event) =>
            fetch(event.target.value)
          }
        >
          <option className="option">Quote currency...</option>
          {currencies.map((currency, index) => {
            return <option className="option" key={index} value={currency}>{currency}</option>
          })}
        </select>
        <div> <h2>Exchange rate is: {exchangeRate}</h2></div>
        <div>
          <div><h2>The price is: {exchangeRate === 'Loading ...' ? 'Loading ...' : (exchangeRate * amount).toFixed(2)}</h2></div>
        </div>
      </div>
    </body>

  </div>
}

export default Exchange