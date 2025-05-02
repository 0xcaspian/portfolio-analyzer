import { Portfolio } from '../types/portfolio'
import { shortenAddress, formatBalance } from '../utils/wallet'

interface PortfolioDisplayProps {
  portfolio: Portfolio | null
  isLoading: boolean
}

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

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Portfolio Analysis</h2>
        <p>Address: {shortenAddress(portfolio.address)}</p>
        <div className="total-value">
          <span className="value-label">Total Value:</span>
          <span className="value-amount">${formatBalance(portfolio.totalValue, 2)}</span>
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