import { useState, useEffect } from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import DeleteModal from "../components/DeleteModal";
import BlogModal from "../components/BlogModal";
import BlogTable from "../components/BlogTable";
import { dummyData } from "../shared/dummyData";

const getLocalData = () => {
  const data = localStorage.getItem("blogPosts");
  return data ? JSON.parse(data) : dummyData;
};

function Home() {
  const [posts, setPosts] = useState(getLocalData);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [error, setError] = useState({});

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const validateForm = () => {
    const newError = {};
    if (!selectedPost.title?.trim()) newError.title = "Title is required";
    if (!selectedPost.author?.trim()) newError.author = "Author is required";
    if (!selectedPost.content?.trim()) newError.content = "Content is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleOpenDialog = () => {
    setSelectedPost({ title: "", author: "", content: "" });
    setError({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const handleSave = (status) => {
    if (!validateForm()) return;
    const newPost = {
      ...selectedPost,
      status,
      id: selectedPost.id || Date.now(),
      date: selectedPost.date || new Date().toLocaleDateString(),
    };
    const updatedPosts = selectedPost.id
      ? posts.map((p) => (p.id === selectedPost.id ? newPost : p))
      : [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    handleCloseDialog();
  };

  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== deleteId));
    setIsDeleteDialogOpen(false);
  };

  return (
    <Container>
      <Grid container my={2} justifyContent="space-between">
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleOpenDialog}>
          Add Post
        </Button>
      </Grid>
      <BlogTable
        search={search}
        posts={posts}
        setDeleteId={setDeleteId}
        setSelectedPost={setSelectedPost}
        setIsDialogOpen={setIsDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      {isDialogOpen && (
        <BlogModal
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSave}
          handlePost={setSelectedPost}
          selectedPost={selectedPost}
          error={error}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteModal
          isOpen={isDeleteDialogOpen}
          onCloseModal={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
}

export default Home;
