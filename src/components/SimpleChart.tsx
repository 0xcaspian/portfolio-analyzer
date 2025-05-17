interface ChartProps {
  data: { time: string; value: number }[]
  width?: number
  height?: number
}

export default function SimpleChart({ data, width = 300, height = 150 }: ChartProps) {
  if (!data.length) return null

  const values = data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue || 1

  const generatePath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((point.value - minValue) / valueRange) * height
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  const getGradientId = () => `gradient-${Math.random().toString(36).substr(2, 9)}`
  const gradientId = getGradientId()

  const isPositive = values[values.length - 1] > values[0]

  return (
    <div className="simple-chart">
      <div className="chart-header">
        <h4>7-Day Trend</h4>
        <span className={`trend-indicator ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '📈' : '📉'} {((values[values.length - 1] / values[0] - 1) * 100).toFixed(1)}%
        </span>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? "#4ade80" : "#ff6b6b"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={isPositive ? "#4ade80" : "#ff6b6b"} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <g className="grid-lines">
          {Array.from({ length: 5 }).map((_, i) => {
            const y = (i / 4) * height
            return (
              <line
                key={i}
                x1="0"
                y1={y}
                x2={width}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            )
          })}
        </g>
        
        {/* Area under curve */}
        <path
          d={`${generatePath()} L ${width},${height} L 0,${height} Z`}
          fill={`url(#${gradientId})`}
        />
        
        {/* Main line */}
        <path
          d={generatePath()}
          fill="none"
          stroke={isPositive ? "#4ade80" : "#ff6b6b"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * width
          const y = height - ((point.value - minValue) / valueRange) * height
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={isPositive ? "#4ade80" : "#ff6b6b"}
              stroke="white"
              strokeWidth="1"
            />
          )
        })}
      </svg>
      
      <div className="chart-footer">
        <span>${minValue.toFixed(2)}</span>
        <span>${maxValue.toFixed(2)}</span>
      </div>
    </div>
  )
}