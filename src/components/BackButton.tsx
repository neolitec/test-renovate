import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
  to?: string
}

const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <Button
      variant="text"
      startIcon={<KeyboardArrowLeftIcon />}
      onClick={() => {
        if (to) {
          navigate(to)
        } else {
          navigateBack()
        }
      }}
    >
      Back
    </Button>
  )
}

export default BackButton
