import React, { useEffect } from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'
import './global.css'

function Connector({ handleConnect }) {
  const wallet = useWallet()

  useEffect(() => {
      if (wallet.status === "connected") handleConnect(wallet.account)
  }, [wallet.status])

  return (
    <div align="right" className="flex-grow">
      {wallet.status === 'connected' ? (
        <h7 className="text-white font-semibold m-2">{wallet.account}</h7>
      ) : (
        <button className="btn btn-contained mx-2 text-sm transition" onClick={() => { wallet.connect() }}>Connect Wallet</button>
      )}
    </div>
  )
}

// Wrap everything in <UseWalletProvider />
export default function WalletConnector({ handleConnect }) {
  return (
    <UseWalletProvider
      chainId={1337}
      connectors={{
        // This is how connectors get configured
        portis: { dAppId: 'my-dapp-id-123-xyz' },
      }}
    >
      <Connector handleConnect={handleConnect}/>
    </UseWalletProvider>
  )
}