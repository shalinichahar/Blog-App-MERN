import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, Box, Paper, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setAuth(false);
          return;
        }
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setAuth(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchUser();
    fetchBlogs();
  }, [setAuth]);

  const handleAddBlog = () => {
    navigate('/add-blog');
  };

  const handleEditBlog = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleViewBlog = (id) => {
    navigate(`/view-blog/${id}`);
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error.response ? error.response.data : error.message);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header name={user.name} email={user.email} profileImage={user.profileImage} setAuth={setAuth} />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
          Discover Blogs
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddBlog} sx={{ marginBottom: 3 }}>
          Add Blog
        </Button>
        <Grid container spacing={3}>
          {blogs.map(blog => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {blog.title}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
                      {blog.description}
                    </Typography>
                    {blog.image && (
                      <Box
                        component="img"
                        src={`http://localhost:5000${blog.image}`}
                        alt={blog.title}
                        sx={{ width: '100%', height: 'auto', marginBottom: 2 }}
                      />
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small" color="primary" onClick={() => handleViewBlog(blog._id)}>
                      View
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleEditBlog(blog._id)}>
                      Edit
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDeleteBlog(blog._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
