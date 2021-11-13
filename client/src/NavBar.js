import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./global.css"
import WalletConnector from './WalletConnector'

class NavBar extends Component {
  render() {
    const GotoExchange = withRouter(({ history }) => (
      <button className="btn btn-contained mx-4 text-sm transition"
        onClick={() => { history.push('/exchange') }}
      >
        Exchange
      </button>
    ))
    const GotoHome = withRouter(({ history }) => (
      <button className="btn btn-contained mx-4 text-sm transition"
        onClick={() => { history.push('/') }}
      >
        Transfer
      </button>
    ))

    return (
      <div className="fixed inline-flex w-full items-center p-2 bg-blue-500">
        <h6 className="text-white font-bold m-2">Deez Token Trader</h6>
        <GotoHome/>
        <GotoExchange/>
        <WalletConnector handleConnect={this.props.handleConnect}/>
      </div>
    )
  }
}

export default NavBar