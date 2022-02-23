import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useMortgageStore from '../store/useMortgageStore'
import MortgagesTable from './MortgagesTable'

const MortgageListPage = () => {
  const navigate = useNavigate()
  const mortgageStore = useMortgageStore()
  const mortgages = mortgageStore.getters.getMortgages()

  return (
    <Container maxWidth="md" sx={{ flex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <h1>Mortgage simulations</h1>
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/mortgage/new')}
        >
          New Mortgage
        </Button>
      </Box>
      <MortgagesTable mortgages={mortgages} />
    </Container>
  )
}

export default MortgageListPage
