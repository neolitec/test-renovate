export function formatAmount(amout: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(amout)
}

export function formatPercentage(percent: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(percent)
}

export function safeFormatAmount(value?: number | null) {
  return value || value === 0 ? formatAmount(value) : '-'
}

export function safeFormatPercentage(value?: number | null) {
  return value || value === 0 ? formatPercentage(value) : '-'
}
