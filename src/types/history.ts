export interface HistoryPoint {
  timestamp: string
  totalValue: number
  networkBreakdown: {
    [chainId: number]: number
  }
}

export interface PriceChange {
  period: '24h' | '7d' | '30d'
  value: number
  percentage: number
  isPositive: boolean
}

export interface PortfolioHistory {
  address: string
  history: HistoryPoint[]
  priceChanges: {
    [key: string]: PriceChange
  }
}