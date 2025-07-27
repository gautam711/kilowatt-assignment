import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function DeleteModal({ isOpen, onCloseModal, onDelete }) {
  return (
    <Dialog open={isOpen} onClose={onCloseModal}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to delete this post?</DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
