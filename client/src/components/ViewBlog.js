import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Comments from './Comment';

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Box sx={{ marginTop: 8, marginBottom: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
              {blog?.title}
            </Typography>
            <Divider />
            <CardContent>
              <Typography variant="body1" component="p" sx={{ mt: 2, marginBottom: 2 }}>
                {blog?.description}
              </Typography>
              {blog?.image && (
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                  sx={{ marginTop: 2, marginBottom: 2, maxHeight: 400 }}
                />
              )}
            </CardContent>
            <Divider />
            <Comments blogId={id} />
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default ViewBlog;
