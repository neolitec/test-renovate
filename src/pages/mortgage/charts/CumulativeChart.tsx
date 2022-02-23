import ChartContainer from '../../../components/Chart'
import type { AmortizationTableRow } from '../model/Mortgage'

interface CumulativeChartProps {
  table: AmortizationTableRow[]
}

const CumulativeChart = ({ table }: CumulativeChartProps) => (
  <ChartContainer
    config={{
      type: 'line',
      data: {
        labels: table.map(
          ({ paymentNumber }) =>
            `${paymentNumber} year${paymentNumber > 1 ? 's' : ''}`,
        ),
        datasets: [
          {
            label: 'Balance',
            pointRadius: 5,
            data: table.map(({ balance }) => Math.round(balance * 100) / 100),
            borderColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Interest',
            pointRadius: 5,
            data: table.map(
              ({ interestAcc }) => Math.round(interestAcc * 100) / 100,
            ),
            borderColor: 'rgb(140, 165, 233)',
            backgroundColor: 'rgba(140, 165, 233, 0.5)',
            fill: true,
          },
          {
            label: 'Payment',
            pointRadius: 5,
            data: table.map(({ paidAcc }) => Math.round(paidAcc * 100) / 100),
            borderColor: 'rgb(77, 75, 192)',
            backgroundColor: 'rgba(77, 75, 192, 0.5)',
            fill: true,
          },
        ],
      },
    }}
  />
)

export default CumulativeChart
