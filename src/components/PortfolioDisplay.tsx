import { Portfolio } from '../types/portfolio'
import { PriceChange } from '../types/history'
import { shortenAddress, formatBalance } from '../utils/wallet'
import PriceChangeIndicator from './PriceChangeIndicator'

interface PortfolioDisplayProps {
  portfolio: Portfolio | null
  isLoading: boolean
}

const getMockPriceChanges = (): { [key: string]: PriceChange } => ({
  '24h': {
    period: '24h',
    value: 245.67,
    percentage: 1.6,
    isPositive: true
  },
  '7d': {
    period: '7d',
    value: -89.23,
    percentage: -0.58,
    isPositive: false
  },
  '30d': {
    period: '30d',
    value: 1456.78,
    percentage: 10.4,
    isPositive: true
  }
})

export default function PortfolioDisplay({ portfolio, isLoading }: PortfolioDisplayProps) {
  if (isLoading) {
    return (
      <div className="portfolio-loading">
        <div className="loading-spinner"></div>
        <p>Fetching portfolio data...</p>
      </div>
    )
  }

  if (!portfolio) {
    return null
  }

  const priceChanges = getMockPriceChanges()

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Portfolio Analysis</h2>
        <p>Address: {shortenAddress(portfolio.address)}</p>
        <div className="total-value">
          <span className="value-label">Total Value:</span>
          <span className="value-amount">${formatBalance(portfolio.totalValue, 2)}</span>
        </div>
        
        <div className="price-changes-grid">
          {Object.values(priceChanges).map((change) => (
            <PriceChangeIndicator key={change.period} priceChange={change} />
          ))}
        </div>
      </div>

      <div className="networks-grid">
        {portfolio.networks.map((network) => (
          <div key={network.chainId} className="network-card">
            <h3>{network.name}</h3>
            <div className="network-value">
              ${formatBalance(network.totalValue, 2)}
            </div>
            
            <div className="tokens-list">
              {network.tokens.length > 0 ? (
                network.tokens.map((token, index) => (
                  <div key={index} className="token-item">
                    <div className="token-info">
                      <span className="token-symbol">{token.symbol}</span>
                      <span className="token-name">{token.name}</span>
                    </div>
                    <div className="token-balance">
                      <div>{formatBalance(token.balance)} {token.symbol}</div>
                      <div className="token-value">${formatBalance(token.value, 2)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-tokens">No tokens found</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="portfolio-footer">
        <small>Last updated: {new Date(portfolio.lastUpdated).toLocaleString()}</small>
      </div>
    </div>
  )
}