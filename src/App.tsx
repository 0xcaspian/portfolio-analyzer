import { useState, useEffect } from 'react'
import './App.css'
import { isValidEthereumAddress } from './utils/wallet'
import PortfolioDisplay from './components/PortfolioDisplay'
import ErrorMessage from './components/ErrorMessage'
import Settings, { UserSettings } from './components/Settings'
import Notification from './components/Notification'
import { Portfolio, SupportedChains } from './types/portfolio'
import { useAutoRefresh } from './hooks/useAutoRefresh'

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [error, setError] = useState<string>('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
  } | null>(null)
  const [settings, setSettings] = useState<UserSettings>({
    currency: 'USD',
    refreshInterval: 5,
    showSmallBalances: true,
    theme: 'dark'
  })

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

  const refreshPortfolio = async (showNotification = false) => {
    if (!portfolio || !walletAddress) return
    
    setIsAnalyzing(true)
    
    setTimeout(() => {
      try {
        const mockPortfolio = createMockPortfolio(walletAddress)
        setPortfolio(mockPortfolio)
        if (showNotification) {
          setNotification({
            message: 'Portfolio refreshed successfully',
            type: 'success'
          })
        }
      } catch (err) {
        if (showNotification) {
          setNotification({
            message: 'Failed to refresh portfolio',
            type: 'error'
          })
        }
      } finally {
        setIsAnalyzing(false)
      }
    }, 1500)
  }

  const handleAnalyze = async () => {
    setError('')
    
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address')
      return
    }
    
    if (!isValidEthereumAddress(walletAddress)) {
      setError('Please enter a valid Ethereum address (0x followed by 40 hex characters)')
      return
    }
    
    setIsAnalyzing(true)
    setPortfolio(null)
    
    setTimeout(() => {
      try {
        const mockPortfolio = createMockPortfolio(walletAddress)
        setPortfolio(mockPortfolio)
        setNotification({
          message: 'Portfolio analyzed successfully',
          type: 'success'
        })
      } catch (err) {
        setError('Failed to analyze portfolio. Please try again.')
      } finally {
        setIsAnalyzing(false)
      }
    }, 3000)
  }

  useAutoRefresh(
    () => refreshPortfolio(true),
    settings.refreshInterval,
    !!portfolio
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case ',':
            event.preventDefault()
            setIsSettingsOpen(true)
            break
          case 'r':
            event.preventDefault()
            if (portfolio) {
              refreshPortfolio(true)
            }
            break
        }
      }
      
      if (event.key === 'Enter' && !isAnalyzing) {
        event.preventDefault()
        handleAnalyze()
      }
      
      if (event.key === 'Escape') {
        if (isSettingsOpen) {
          setIsSettingsOpen(false)
        }
        if (notification) {
          setNotification(null)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [portfolio, isAnalyzing, isSettingsOpen, notification, walletAddress])

  return (
    <div className="app">
      <button 
        className="settings-button"
        onClick={() => setIsSettingsOpen(true)}
        title="Settings"
      >
        ⚙️
      </button>

      <div className="header">
        <h1 className="title">Portfolio Analyzer</h1>
        <p className="subtitle">Analyze your crypto portfolio across multiple chains</p>
      </div>
      
      <div className="wallet-input-container">
        <label htmlFor="wallet-address" className="sr-only">
          Wallet Address
        </label>
        <input
          id="wallet-address"
          type="text"
          placeholder="Enter wallet address (0x...)"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="wallet-input"
          aria-describedby="wallet-help"
          autoComplete="off"
        />
        <div id="wallet-help" className="sr-only">
          Enter a valid Ethereum wallet address to analyze your portfolio
        </div>
        <button 
          onClick={handleAnalyze} 
          className="analyze-btn"
          disabled={isAnalyzing}
          aria-label={isAnalyzing ? 'Analyzing portfolio' : 'Analyze portfolio'}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Portfolio'}
        </button>
      </div>
      
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      
      <PortfolioDisplay portfolio={portfolio} isLoading={isAnalyzing} />
      
      <div className="networks-section">
        <h3 className="networks-title">Supported Networks</h3>
        <ul className="networks-list">
          <li>🔷 Ethereum Mainnet</li>
          <li>🟡 Binance Smart Chain</li>
          <li>🟣 Polygon</li>
        </ul>
      </div>
      
      <Settings
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      {portfolio && (
        <div className="refresh-indicator">
          🔄 Auto-refresh every {settings.refreshInterval} min
        </div>
      )}
    </div>
  )
}

export default App