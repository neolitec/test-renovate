import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import CumulativeChart from '../../charts/CumulativeChart'
import PaymentsChart from '../../charts/PaymentsChart'
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
      <CumulativeChart table={amortizationData} />
      <PaymentsChart table={amortizationData} />
    </>
  )
}

export default AmortizationChart
