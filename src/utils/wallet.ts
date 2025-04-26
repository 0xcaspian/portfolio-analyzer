export const isValidEthereumAddress = (address: string): boolean => {
  const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/
  return ethAddressPattern.test(address)
}

export const shortenAddress = (address: string): string => {
  if (!isValidEthereumAddress(address)) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatBalance = (balance: number, decimals: number = 4): string => {
  return balance.toFixed(decimals)
}