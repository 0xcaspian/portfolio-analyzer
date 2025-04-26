export interface Token {
  symbol: string
  name: string
  balance: number
  price: number
  value: number
  contractAddress: string
  decimals: number
}

export interface NetworkData {
  chainId: number
  name: string
  tokens: Token[]
  totalValue: number
}

export interface Portfolio {
  address: string
  networks: NetworkData[]
  totalValue: number
  lastUpdated: string
}

export enum SupportedChains {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137
}

export const CHAIN_NAMES = {
  [SupportedChains.ETHEREUM]: 'Ethereum',
  [SupportedChains.BSC]: 'Binance Smart Chain', 
  [SupportedChains.POLYGON]: 'Polygon'
}