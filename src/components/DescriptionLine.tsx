import { Box, Typography } from '@mui/material'

interface DescriptionLineProps {
  label: string
  value?: string | number
}

const DescriptionLine = ({ label, value }: DescriptionLineProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body1" fontWeight="bold">
      {value}
    </Typography>
  </Box>
)

export default DescriptionLine
