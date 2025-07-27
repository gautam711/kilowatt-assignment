import { Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyData } from '../shared/dummyData';

const getLocalData = () => {
  const data = localStorage.getItem('blogPosts');
  return data ? JSON.parse(data) : dummyData;
};

function Post() {
  const { id } = useParams();
  const post = getLocalData().find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  if (!post) return <Typography variant="h6" sx={{ p: 4 }}>Post not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>By {post.author} on {post.date}</Typography>
      <Typography variant="body1" gutterBottom>Status: {post.status}</Typography>
      <Typography variant="body1">{post.content}</Typography>
    </Container>
  );
};

export default Post