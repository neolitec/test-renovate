import ChartContainer from '../../../components/Chart'
import { formatAmount } from '../../../lib/number'
import type { AmortizationTableRow } from '../model/Mortgage'

interface PaymentsChartProps {
  table: AmortizationTableRow[]
}

const PaymentsChart = ({ table }: PaymentsChartProps) => (
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
        plugins: {
          tooltip: {
            callbacks: {
              footer: (tooltipItems) => {
                let sum = 0

                tooltipItems.forEach((tooltipItem) => {
                  sum += tooltipItem.parsed.y
                })
                return `Total: ${formatAmount(sum)}`
              },
            },
          },
        },
      },
      data: {
        labels: table
          .map(
            ({ paymentNumber }) =>
              `${paymentNumber} year${paymentNumber > 1 ? 's' : ''}`,
          )
          .slice(1),
        datasets: [
          {
            label: 'Interest',
            data: table
              .map(({ interest }) => Math.round(interest * 100) / 100)
              .slice(1),
            backgroundColor: 'rgb(140, 165, 233)',
          },
          {
            label: 'Principal',
            data: table
              .map(({ principal }) => Math.round(principal * 100) / 100)
              .slice(1),
            backgroundColor: 'rgb(77, 75, 192)',
          },
        ],
      },
    }}
  />
)

export default PaymentsChart
