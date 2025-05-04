export const APP_CONFIG = {
  name: 'Portfolio Analyzer',
  version: '1.0.0',
  description: 'Crypto portfolio analysis across multiple chains'
}

export const NETWORK_CONFIG = {
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/'
  },
  bsc: {
    name: 'Binance Smart Chain', 
    symbol: 'BNB',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC', 
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/'
  }
}

export const SUPPORTED_TOKENS = [
  'ETH', 'BTC', 'USDC', 'USDT', 'BNB', 'MATIC', 'LINK', 'UNI'
]