import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useMemo, useState } from "react";

function BlogTable({
  posts,
  search,
  setDeleteId,
  setSelectedPost,
  setIsDeleteDialogOpen,
  setIsDialogOpen,
}) {
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredSortedPosts = useMemo(() => {
    return [...posts]
      .filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.author.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const x = a[orderBy].toLowerCase();
        const y = b[orderBy].toLowerCase();
        return order === "asc" ? x.localeCompare(y) : y.localeCompare(x);
      });
  }, [posts, search, order, orderBy]);

  const paginatedPosts = useMemo(() => {
    return filteredSortedPosts.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredSortedPosts, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["title", "author", "date"].map((col) => (
              <TableCell key={col}>
                <TableSortLabel
                  active={orderBy === col}
                  direction={order}
                  onClick={() => handleSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPosts.map((post) => (
            <TableRow
              key={post.id}
              hover
              onClick={() => navigate(`/${post.id}`)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => {
                      setSelectedPost(post);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      setDeleteId(post.id);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredSortedPosts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
}

export default BlogTable;
