import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialogue = ({open, handleClose, deleteHandler}) => {
  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure?</DialogContentText>
                <DialogContentText> You want to delete this group?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='success' variant='contained' onClick={handleClose}>No</Button>
                <Button color='error' variant='contained' onClick={deleteHandler}>Yes</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmDeleteDialogue