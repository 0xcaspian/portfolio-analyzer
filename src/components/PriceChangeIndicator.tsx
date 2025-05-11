import { PriceChange } from '../types/history'
import { formatBalance } from '../utils/wallet'

interface PriceChangeIndicatorProps {
  priceChange: PriceChange
}

export default function PriceChangeIndicator({ priceChange }: PriceChangeIndicatorProps) {
  const { period, value, percentage, isPositive } = priceChange
  
  return (
    <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
      <div className="period-label">{period}</div>
      <div className="change-value">
        {isPositive ? '+' : ''}${formatBalance(Math.abs(value), 2)}
      </div>
      <div className="change-percentage">
        {isPositive ? '↗' : '↘'} {Math.abs(percentage).toFixed(2)}%
      </div>
    </div>
  )
}