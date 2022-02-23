import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Navigate, Route, Routes } from 'react-router-dom'
import MortgagePage from './pages/mortgage/MortgagePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6">Mortgage Calculator</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/mortgage" />} />
        <Route path="/mortgage/*" element={<MortgagePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
