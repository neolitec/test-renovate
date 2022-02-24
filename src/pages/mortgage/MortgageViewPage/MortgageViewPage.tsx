import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import Tabs from '../../../components/Tabs'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
import useMortgageStore from '../store/useMortgageStore'
import AmortizationChart from './tabs/AmortizationChart'
import AmortizationGrid from './tabs/AmortizationGrid'
import MortgageDetails from './tabs/MortgageDetails'

const MortgageViewPage = () => {
  const { mortgageId } = useParams()
  const mortgageStore = useMortgageStore()
  const mortgage = mortgageStore.getters.getMortgage(mortgageId || '')

  if (!mortgage) {
    return <NotFoundPage />
  }

  return (
    <Box sx={{ flex: 1, flexDirection: 'column' }}>
      <Box sx={{ flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            pb: (t) => t.spacing(2),
          }}
        >
          <BackButton label="Back to list" to="/mortgage" />
          <h1>{mortgage.name}</h1>
        </Box>
      </Box>
      <Tabs
        tabData={[
          {
            label: 'Details',
            content: <MortgageDetails mortgage={mortgage} />,
          },
          {
            label: 'Amortization',
            content: <AmortizationGrid mortgage={mortgage} />,
          },
          {
            label: 'Chart',
            content: <AmortizationChart mortgage={mortgage} />,
          },
        ]}
      />
    </Box>
  )
}

export default MortgageViewPage
