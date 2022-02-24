import { Box, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import DescriptionLine from '../../../../components/DescriptionLine'
import {
  formatPercentage,
  safeFormatAmount,
  safeFormatPercentage,
} from '../../../../lib/number'
import type Mortgage from '../../model/Mortgage'

interface MortgageDetailsProps {
  mortgage: Mortgage
}

const MortgageDetails = ({ mortgage }: MortgageDetailsProps) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number>()
  const [totalPayment, setTotalPayment] = useState<number>()
  const [totalInterest, setTotalInterest] = useState<number>()

  useEffect(() => {
    if (mortgage) {
      setMonthlyPayment(mortgage.getPayment())
      setTotalPayment(mortgage.getTotalPayment())
      setTotalInterest(mortgage.getTotalInterest())
    }
  }, [mortgage])

  return (
    <Box
      sx={{
        mx: 'auto',
        maxWidth: 'sm',
        display: 'flex',
        flexDirection: 'column',
        gap: (t) => t.spacing(2),
      }}
    >
      <DescriptionLine
        label="Total amout"
        value={safeFormatAmount(mortgage.amount)}
      />
      <DescriptionLine
        label="Interest rate"
        value={safeFormatPercentage(mortgage.interestRate / 100)}
      />
      <DescriptionLine
        label="Amortization period"
        value={`${mortgage.amortization} year${
          mortgage.amortization > 1 && 's'
        }`}
      />
      <DescriptionLine label="Payments frequency" value="monthly" />
      <Divider />
      <DescriptionLine
        label="Down payment"
        value={`${safeFormatAmount(mortgage.downPayment)} (${formatPercentage(
          mortgage.getDownPaymentInPercent() / 100,
        )})`}
      />
      <DescriptionLine
        label="Credit amount"
        value={safeFormatAmount(mortgage.getCreditAmount())}
      />
      <DescriptionLine
        label="Monthly payment"
        value={safeFormatAmount(monthlyPayment)}
      />
      <DescriptionLine
        label="Total payment"
        value={safeFormatAmount(totalPayment)}
      />
      <DescriptionLine
        label="Total interest"
        value={safeFormatAmount(totalInterest)}
      />
    </Box>
  )
}

export default MortgageDetails
