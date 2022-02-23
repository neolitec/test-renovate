import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type Mortgage from '../model/Mortgage'
import useMortgageStore from '../store/useMortgageStore'

interface DeleteMortgageModalProps {
  mortgage: Mortgage
  open: boolean
  onClose: () => void
}

const DeleteMortgageModal = ({
  mortgage,
  open,
  onClose,
}: DeleteMortgageModalProps) => {
  const mortgageStore = useMortgageStore()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete a simulation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete the simulation "{mortgage.name}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            onClose()
          }}
        >
          Cancel
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={() => {
            mortgageStore.mutations.deleteMortgage(mortgage.id)
            onClose()
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteMortgageModal
