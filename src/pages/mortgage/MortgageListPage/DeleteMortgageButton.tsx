import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import type Mortgage from '../model/Mortgage'
import DeleteMortgageModal from './DeleteMortgageModal'

interface DeleteMortgageButtonProps {
  mortgage: Mortgage
}

const DeleteMortgageButton = ({ mortgage }: DeleteMortgageButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DeleteMortgageModal
        mortgage={mortgage}
        open={open}
        onClose={() => setOpen(false)}
      />
      <IconButton
        aria-label="delete"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default DeleteMortgageButton
