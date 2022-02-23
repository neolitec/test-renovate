import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import ChartContainer from '../../../../components/Chart'
import type Mortgage from '../../model/Mortgage'
import type { AmortizationTableRow } from '../../model/Mortgage'

interface AmortizationChartProps {
  mortgage: Mortgage
}

const AmortizationChart = ({ mortgage }: AmortizationChartProps) => {
  const [amortizationData, setAmortizationData] =
    useState<AmortizationTableRow[]>()

  useEffect(() => {
    if (mortgage) {
      setAmortizationData(mortgage.getAmortizationTable())
    }
  }, [mortgage])

  if (!amortizationData) {
    return <CircularProgress sx={{ mx: 'auto' }} />
  }

  return (
    <>
      <ChartContainer
        config={{
          type: 'line',
          data: {
            labels: amortizationData.map(
              ({ paymentNumber }) =>
                `${paymentNumber} year${paymentNumber > 1 ? 's' : ''}`,
            ),
            datasets: [
              {
                label: 'Balance',
                pointRadius: 5,
                data: amortizationData.map(
                  ({ balance }) => Math.round(balance * 100) / 100,
                ),
                borderColor: 'rgb(75, 192, 192)',
              },
            ],
          },
        }}
      />
      <ChartContainer
        config={{
          type: 'bar',
          options: {
            responsive: true,
            scales: {
              xAxis: {
                stacked: true,
              },
              yAxis: {
                stacked: true,
              },
            },
          },
          data: {
            labels: amortizationData
              .map(
                ({ paymentNumber }) =>
                  `${paymentNumber} year${paymentNumber > 1 ? 's' : ''}`,
              )
              .slice(1),
            datasets: [
              {
                label: 'Interest',
                data: amortizationData
                  .map(({ interest }) => Math.round(interest * 100) / 100)
                  .slice(1),
                borderColor: 'rgb(140, 165, 233)',
                backgroundColor: 'rgb(140, 165, 233)',
              },
              {
                label: 'Principal',
                data: amortizationData
                  .map(({ principal }) => Math.round(principal * 100) / 100)
                  .slice(1),
                borderColor: 'rgb(77, 75, 192)',
                backgroundColor: 'rgb(77, 75, 192)',
              },
            ],
          },
        }}
      />
    </>
  )
}

export default AmortizationChart
