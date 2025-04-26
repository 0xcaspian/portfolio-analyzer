import { useState } from 'react'
import './App.css'
import { isValidEthereumAddress } from './utils/wallet'

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!walletAddress.trim()) {
      alert('Please enter a wallet address')
      return
    }
    
    if (!isValidEthereumAddress(walletAddress)) {
      alert('Please enter a valid Ethereum address')
      return
    }
    
    setIsAnalyzing(true)
    console.log('Analyzing wallet:', walletAddress)
    
    setTimeout(() => {
      setIsAnalyzing(false)
      alert('Analysis complete! (Demo)')
    }, 2000)
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
        <button 
          onClick={handleAnalyze} 
          className="analyze-btn"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Portfolio'}
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