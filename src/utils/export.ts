import { Portfolio } from '../types/portfolio'

export const exportToCsv = (portfolio: Portfolio): void => {
  const csvData = []
  
  // Header
  csvData.push(['Network', 'Token Symbol', 'Token Name', 'Balance', 'Price', 'Value'])
  
  // Data rows
  portfolio.networks.forEach(network => {
    network.tokens.forEach(token => {
      csvData.push([
        network.name,
        token.symbol,
        token.name,
        token.balance.toString(),
        `$${token.price.toFixed(2)}`,
        `$${token.value.toFixed(2)}`
      ])
    })
  })
  
  // Summary row
  csvData.push(['', '', '', '', 'Total Value:', `$${portfolio.totalValue.toFixed(2)}`])
  
  const csvContent = csvData.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `portfolio_${portfolio.address.slice(0, 8)}_${new Date().toISOString().split('T')[0]}.csv`
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToJson = (portfolio: Portfolio): void => {
  const jsonData = JSON.stringify(portfolio, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `portfolio_${portfolio.address.slice(0, 8)}_${new Date().toISOString().split('T')[0]}.json`
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}