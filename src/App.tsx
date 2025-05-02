import { useState } from 'react'
import './App.css'
import { isValidEthereumAddress } from './utils/wallet'
import PortfolioDisplay from './components/PortfolioDisplay'
import { Portfolio, SupportedChains } from './types/portfolio'

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  const createMockPortfolio = (address: string): Portfolio => {
    return {
      address,
      totalValue: 15420.75,
      lastUpdated: new Date().toISOString(),
      networks: [
        {
          chainId: SupportedChains.ETHEREUM,
          name: 'Ethereum',
          totalValue: 12350.25,
          tokens: [
            {
              symbol: 'ETH',
              name: 'Ethereum',
              balance: 5.2,
              price: 2100.50,
              value: 10922.60,
              contractAddress: '0x0000000000000000000000000000000000000000',
              decimals: 18
            },
            {
              symbol: 'USDC',
              name: 'USD Coin',
              balance: 1427.65,
              price: 1.00,
              value: 1427.65,
              contractAddress: '0xA0b86a33E6441d3c8b8Ca7f5b4eB2B4C30C1C6d2',
              decimals: 6
            }
          ]
        },
        {
          chainId: SupportedChains.POLYGON,
          name: 'Polygon',
          totalValue: 3070.50,
          tokens: [
            {
              symbol: 'MATIC',
              name: 'Polygon',
              balance: 2500,
              price: 0.85,
              value: 2125.00,
              contractAddress: '0x0000000000000000000000000000000000001010',
              decimals: 18
            },
            {
              symbol: 'WETH',
              name: 'Wrapped Ether',
              balance: 0.45,
              price: 2101.00,
              value: 945.50,
              contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
              decimals: 18
            }
          ]
        }
      ]
    }
  }

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
    setPortfolio(null)
    
    setTimeout(() => {
      const mockPortfolio = createMockPortfolio(walletAddress)
      setPortfolio(mockPortfolio)
      setIsAnalyzing(false)
    }, 3000)
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
      
      <PortfolioDisplay portfolio={portfolio} isLoading={isAnalyzing} />
      
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