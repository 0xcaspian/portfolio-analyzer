import { useState } from 'react'

function App() {
  const [walletAddress, setWalletAddress] = useState('')

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Portfolio Analyzer</h1>
      <p>Analyze your crypto portfolio across multiple chains</p>
      
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          style={{ 
            padding: '10px', 
            width: '300px', 
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Analyze
        </button>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Supported Networks:</h3>
        <ul>
          <li>Ethereum</li>
          <li>Binance Smart Chain</li>
          <li>Polygon</li>
        </ul>
      </div>
    </div>
  )
}

export default App