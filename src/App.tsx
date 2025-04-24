import { useState } from 'react'
import './App.css'

function App() {
  const [walletAddress, setWalletAddress] = useState('')

  const handleAnalyze = () => {
    if (!walletAddress) {
      alert('Please enter a wallet address')
      return
    }
    console.log('Analyzing wallet:', walletAddress)
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Portfolio Analyzer</h1>
        <p className="subtitle">Analyze your crypto portfolio across multiple chains</p>
      </div>
      
      <div className="wallet-input-container">
        <input
          type="text"
          placeholder="Enter wallet address (0x...)"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="wallet-input"
        />
        <button onClick={handleAnalyze} className="analyze-btn">
          Analyze Portfolio
        </button>
      </div>
      
      <div className="networks-section">
        <h3 className="networks-title">Supported Networks</h3>
        <ul className="networks-list">
          <li>🔷 Ethereum Mainnet</li>
          <li>🟡 Binance Smart Chain</li>
          <li>🟣 Polygon</li>
        </ul>
      </div>
    </div>
  )
}

export default App