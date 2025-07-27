import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Close } from '@mui/icons-material';
import { STATUS } from '../shared/utils';

function BlogModal({isOpen, onClose, onSubmit, handlePost, selectedPost, error}) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>
          {selectedPost?.id ? 'Edit Post' : 'Add Post'}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
          <DialogContent>
          <Grid container spacing={2} my={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={selectedPost?.title || ''}
                onChange={e => handlePost({ ...selectedPost, title: e.target.value })}
                error={!!error.title}
                helperText={error.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                fullWidth
                value={selectedPost?.author || ''}
                onChange={e => handlePost({ ...selectedPost, author: e.target.value })}
                error={!!error.author}
                helperText={error.author}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                fullWidth
                multiline
                minRows={4}
                value={selectedPost?.content || ''}
                onChange={e => handlePost({ ...selectedPost, content: e.target.value })}
                error={!!error.content}
                helperText={error.content}
              />
            </Grid>
          </Grid>
        </DialogContent>
          <DialogActions>
            <Button onClick={() => onSubmit(STATUS.DRAFT)}>Save as Draft</Button>
            <Button variant="contained" onClick={() => onSubmit(STATUS.PUBLISHED)}>Publish</Button>
          </DialogActions>
        </Dialog>
  )
}

export default BlogModal