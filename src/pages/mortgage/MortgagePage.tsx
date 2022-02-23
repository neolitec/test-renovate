import { Container } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import MortgageListPage from './MortgageListPage/MortgageListPage'
import MortgageNewPage from './MortgageNewPage/MortgageNewPage'
import MortgageViewPage from './MortgageViewPage/MortgageViewPage'

const MortgagePage = () => (
  <Container
    component="main"
    maxWidth="md"
    sx={{
      my: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: (t) => t.spacing(4),
      height: '100%',
    }}
  >
    <Routes>
      <Route path="/" element={<MortgageListPage />} />
      <Route path="/new" element={<MortgageNewPage />} />
      <Route path="/view/:mortgageId" element={<MortgageViewPage />} />
      <Route path="*" element={<Navigate replace to="/mortgage" />} />
    </Routes>
  </Container>
)

export default MortgagePage
