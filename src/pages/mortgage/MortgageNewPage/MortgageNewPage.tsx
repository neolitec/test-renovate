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
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import NumberTextField from '../../../components/NumberTextField'
import useMortgageForm from '../hooks/useMortgageForm'
import type { PaymentFrequency } from '../model/Mortgage'
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
    },
    setState,
    mortgage,
    isFormComplete,
  } = useMortgageForm()

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
        <NumberTextField
          label="Amortization Period"
          sx={{ flex: 1 }}
          value={amortizationPeriod}
          onChange={(value) => setState({ amortization: value })}
          NumberFormatProps={{
            decimalScale: 0,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                year{Number(amortizationPeriod) > 1 && 's'}
              </InputAdornment>
            ),
          }}
        />
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
            <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
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
      <Divider />
    </Container>
  )
}

export default MortgageNewPage
