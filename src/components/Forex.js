import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Forex = () => {
  const [currencies, updateCurrencies] = useState({})
  const [currency1, updateCurrency1] = useState('')
  const [currency2, updateCurrency2] = useState('')
  const [amount, updateAmount] = useState('')
  const [exchangeRate, updateExchangeRate] = useState('')
useEffect(() => {
  axios.get('https://openexchangerates.org/api/currencies.json') //First Api used, fetching the currency list from the API
  .then(resp => {
    updateCurrencies(resp.data)
  })
})
  const fetch1 = (currency1) => { //Update first currency and get exchange rate
    updateCurrency1(currency1)
    fetch(currency1, currency2)
  }
  const fetch2 = (currency2) => { //Update second currency and get exchange rate
    updateCurrency2(currency2)
    fetch(currency1, currency2)
  }
  const fetch = (currency1, currency2)=> { 
    if (currency1 && currency2){
    updateExchangeRate("Loading ...")
    axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency1}&to_currency=${currency2}&apikey=PKAPG80ELUH9O8CR`) //Second Api used, for getting the exchange rate to convert
      .then(resp => {
        updateExchangeRate(resp.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
      })
    }
  }

  return <div className="crypto-background">
    <body className="crypt">
      <div className="cryptobody">
      <h1>Foreign Currency Exchange</h1>
    <input className="forexinput" 
      placeholder='Enter Amount'
      onChange={(event) => updateAmount(event.target.value)} 
    >
    </input>
    <select
      className="forexinput"
      onChange={(event) => fetch1(event.target.value)}
    >
      <option>Please choose a currency...</option>
      {Object.keys(currencies).map((currency, index) => {
        return <option key={index} value={currency}>{currency} - {currencies[currency]}</option>
      })}
    </select>
    <select
      className="forexinput"
      onChange={(event) =>
        fetch2(event.target.value)
      }
    >
      <option>Please choose a currency...</option>
      {Object.keys(currencies).map((currency, index) => {
        return <option key={index} value={currency}>{currency} - {currencies[currency]}</option>
      })}
    </select>
    <div> Exchange rate is: {exchangeRate}</div>
    <div> Amount in {currency2} is: {exchangeRate==='Loading ...' ? 'Loading ...' : exchangeRate * amount}</div>
  </div>
  </body>

</div>
}
export default Forex










