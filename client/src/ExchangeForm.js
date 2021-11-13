import React, { Component } from 'react'
import './global.css'

class ExchangeForm extends Component {
  render() {
    return (
      <div>
          <div className="text-lg">Exchange Deez</div>
          <div className="h-3"></div>
          <input
            type="text"
            className="shadow border-2 rounded w-1/2 text-gray-700 focus:outline-none focus:border-blue-500"
            ref={deezAmount => {this.deezAmount = deezAmount}}
            placeholder="Deez Amount"
            onChange={e => {
              const ethAmount = this.deezAmount.value / 1000
              this.ethAmount.value = ethAmount
            }}
            />
          <div className="h-1"></div>
          <input
            type="text"
            className="shadow border-2 rounded w-1/2 text-gray-700 focus:outline-none focus:border-blue-500"
            ref={ethAmount => {this.ethAmount = ethAmount}}
            placeholder="Eth Amount"
            onChange={e => {
              const deezAmount = this.ethAmount.value * 1000
              this.deezAmount.value = deezAmount
            }}
          />
        <div className="h-1"></div>
        <button className="btn-shaded btn-outlined m-2 transition" onClick={async (e) => {
          e.preventDefault()
          const ethAmount = this.ethAmount.value
          if (!ethAmount) return
          await this.props.handleBuy(this.props.state.web3.utils.toWei(ethAmount.toString(), "ether"))

          this.deezAmount.value = null
          this.ethAmount.value = null
        }}>
          Buy Deez
        </button>
        <button className="btn-shaded btn-outlined m-2 transition" onClick={async (e) => {
          e.preventDefault()
          const deezAmount = this.deezAmount.value
          if (!deezAmount) return
          await this.props.handleSell(deezAmount)

          this.deezAmount.value = null
          this.ethAmount.value = null
        }}>
          Sell Deez
        </button>
      </div>
    )
  }
}

export default ExchangeForm