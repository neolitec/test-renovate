import { Container } from '@mui/material'
import Nope from './nope.gif'

const NotFoundPage = () => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: (t) => t.spacing(4),
    }}
  >
    <img src={Nope} alt="Nope" />
    <span>Nooooooooooooope nope nope nope nope!</span>
  </Container>
)

export default NotFoundPage
