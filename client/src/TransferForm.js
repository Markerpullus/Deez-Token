import React, { Component } from 'react'
import './global.css'

class TransferForm extends Component {
  render() {
    return (
      <div>
        <div>
          <form onSubmit={async (e) => {
            e.preventDefault()
            if (!this.toAddress.value) return
            await this.props.handleTransfer(
              this.toAddress.value.toString(),
              parseInt(this.amount.value)
            )
            this.toAddress.value = null
            this.amount.value = null
          }}>
              <div className="text-lg">Transfer Deez</div>
              <div className="h-3"></div>
              <input
                type="text"
                className="shadow border-2 rounded w-1/2 text-gray-700 focus:outline-none focus:border-blue-500"
                ref={toAddress => {this.toAddress = toAddress}}
                placeholder="To address"
              />
              <div className="h-1"></div>
              <input
                type="text"
                className="shadow border-2 rounded w-1/2 text-gray-700 focus:outline-none focus:border-blue-500"
                ref={amount => {this.amount = amount}}
                placeholder="Amount"
              />
              <div className="h-1"></div>
              <button type="submit" className="btn-shaded btn-outlined m-2 transition">Transfer</button>
          </form>
        </div>
      </div>
    )
  }
}

export default TransferForm