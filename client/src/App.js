import React, {Component} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Deez from "./contracts/Deez.json"
import DeezExchanger from "./contracts/DeezExchanger.json"
import getWeb3 from "./getWeb3"
import NavBar from "./NavBar"
import TransferForm from "./TransferForm"
import ExchangeForm from "./ExchangeForm"

class App extends Component {
  constructor() {
    super();
    this.state = { balance: 0, web3: null, account: null, deezContract: null, exchangerContract: null }
  }

  componentDidMount = async () => {
    const web3 = await getWeb3()

    // Load deez
    const netId = await web3.eth.net.getId()
    const deployedNetwork = Deez.networks[netId]
    const deezContract = new web3.eth.Contract(
      Deez.abi,
      deployedNetwork && deployedNetwork.address
    )

    // Load exchanger
    const exchangerNetwork = DeezExchanger.networks[netId]
    const exchangerContract = new web3.eth.Contract(
      DeezExchanger.abi,
      exchangerNetwork && exchangerNetwork.address
    )

    this.setState({ web3, deezContract, exchangerContract })
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.account != this.state.account) await this.refreshBalance()
  }

  connectWallet = (account) => {
    this.setState({ account: account })
  }

  refreshBalance = async () => {
    try {
      const { account, deezContract } = this.state
      const balance = await deezContract.methods.balanceOf(account).call()

      this.setState({balance: balance})
    } catch (e) {
      console.error(e)
    }
  }

  transferDeez = async (address, amount) => {
    const { account, deezContract } = this.state
    if (amount <= 0) return
    if (!account) return
    if (!this.state.web3.utils.isAddress(address)) return
    await deezContract.methods.transfer(address, amount).send({ from: account })

    await this.refreshBalance()
  }

  buyDeez = async (amount) => {
    const { account, exchangerContract } = this.state
    if (amount <= 0) return
    if (!account) return
    await exchangerContract.methods.buyDeez().send({ value: amount, from: account })

    await this.refreshBalance()
  }

  sellDeez = async (amount) => {
    const { account, deezContract, exchangerContract } = this.state
    if (amount <= 0) return
    if (!account) return
    if (this.state.balance < amount) { alert("Insufficient balance"); return }
    await deezContract.methods.approve(exchangerContract._address, amount).send({ from: account })
    await exchangerContract.methods.sellDeez(amount).send({ from: account })

    await this.refreshBalance()
  }

  render() {
    /*
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contracts...</div>;
    }*/
    return (
      <Router>
        <NavBar state={this.state} handleConnect={this.connectWallet} />
        <div className="flex justify-center items-center text-center rounded-md">
          <div className="mt-20 w-1/3 shadow-lg">
            <div className="m-5 text-xl">Balance: {this.state.balance}</div>
          </div>
        </div>

        <div className="flex justify-center items-center text-center rounded-md">
          <div className="mt-2 w-1/3 shadow-lg">
            <Switch>
              <Route exact path="/">
                <TransferForm 
                  state={this.state} 
                  handleTransfer={this.transferDeez}
                  />
              </Route>
              <Route path="/exchange">
                <ExchangeForm
                state={this.state}
                handleBuy={this.buyDeez}
                handleSell={this.sellDeez}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
