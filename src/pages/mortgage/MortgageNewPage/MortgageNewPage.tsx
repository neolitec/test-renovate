import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import DescriptionLine from '../../../components/DescriptionLine'
import NumberTextField from '../../../components/NumberTextField'
import { formatPercentage, safeFormatAmount } from '../../../lib/number'
import CumulativeChart from '../charts/CumulativeChart'
import useMortgageForm from '../hooks/useMortgageForm'
import type { AmortizationTableRow, PaymentFrequency } from '../model/Mortgage'
import useMortgageStore from '../store/useMortgageStore'

const MortgageNewPage = () => {
  const navigate = useNavigate()
  const mortgageStore = useMortgageStore()
  const {
    state: {
      name,
      amount,
      interestRate,
      amortization: amortizationPeriod,
      paymentFrequency,
      downPayment,
    },
    setState,
    mortgage,
    isFormComplete,
    isAdvancedOptionsVisible,
    showAdvancedOptions,
  } = useMortgageForm()
  const [amortizationTable, setAmortizationTable] = useState<
    AmortizationTableRow[] | null
  >(null)

  useEffect(() => {
    setAmortizationTable(mortgage ? mortgage.getAmortizationTable() : null)
  }, [mortgage])

  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: (t) => t.spacing(2),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          pb: (t) => t.spacing(2),
        }}
      >
        <BackButton />
        <h1>Create a mortgage</h1>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: (t) => t.spacing(2),
        }}
      >
        <TextField
          autoFocus
          label="Name"
          sx={{ flex: 1 }}
          value={name}
          onChange={(e) => setState({ name: e.target.value })}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: (t) => t.spacing(2),
        }}
      >
        <NumberTextField
          label="Mortgage amount"
          sx={{ flex: 1 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
          value={amount}
          onChange={(value) => setState({ amount: value })}
        />
        <NumberTextField
          label="Interest rate"
          sx={{ flex: 1 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          value={interestRate}
          onChange={(value) => setState({ interestRate: value })}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: (t) => t.spacing(2),
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="amortization-period-label">
            Payment Frequency
          </InputLabel>
          <Select
            labelId="amortization-period-label"
            id="amortization-period"
            value={amortizationPeriod}
            onChange={(event) => {
              if (
                (Number.isInteger as (input: any) => input is number)(
                  event.target.value,
                )
              ) {
                setState({
                  amortization: event.target.value,
                })
              }
            }}
            label="amortization-period"
          >
            <MenuItem value={undefined} />
            {[...Array(30).keys()].map((i) => (
              <MenuItem value={i + 1} key={`amortization-period-${i + 1}`}>
                {i + 1} year{i > 0 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="payment-frequency-label">
            Payment Frequency
          </InputLabel>
          <Select
            labelId="payment-frequency-label"
            id="payment-frequency"
            value={paymentFrequency}
            onChange={(event) => {
              setState({
                paymentFrequency: event.target.value as PaymentFrequency,
              })
            }}
            label="Payment Frequency"
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="biweekly">Bi-weekly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isAdvancedOptionsVisible && (
        <>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: (t) => t.spacing(2),
            }}
          >
            <NumberTextField
              autoFocus={isAdvancedOptionsVisible}
              label="Down payment"
              sx={{ flex: 1 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
              value={downPayment}
              onChange={(value) => setState({ downPayment: value })}
            />
          </Box>
        </>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isAdvancedOptionsVisible
            ? 'flex-end'
            : 'space-between',
        }}
      >
        {!isAdvancedOptionsVisible && (
          <Button
            sx={{ float: 'right' }}
            variant="text"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={() => {
              showAdvancedOptions()
            }}
          >
            Advanced options
          </Button>
        )}
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          disabled={!isFormComplete}
          onClick={() => {
            if (mortgage) {
              mortgageStore.mutations.addMortgage(mortgage)
              navigate(`/mortgage/view/${mortgage.id}`)
            }
          }}
        >
          Create and Calculate
        </Button>
      </Box>

      {mortgage && (
        <>
          <Divider />
          <DescriptionLine
            label="Down payment"
            value={`${safeFormatAmount(
              mortgage.downPayment,
            )} (${formatPercentage(mortgage.getDownPaymentInPercent() / 100)})`}
          />
          <DescriptionLine
            label="Credit amount"
            value={safeFormatAmount(mortgage.getCreditAmount())}
          />
          <DescriptionLine
            label="Payments"
            value={safeFormatAmount(mortgage.getPayment())}
          />
          <DescriptionLine
            label="Total interest"
            value={safeFormatAmount(mortgage.getTotalInterest())}
          />
          <Divider />
        </>
      )}

      {amortizationTable && <CumulativeChart table={amortizationTable} />}
    </Container>
  )
}

export default MortgageNewPage
