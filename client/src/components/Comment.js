import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/comments/${blogId}`);
      setComments(data);
    };

    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/comments/add', {
        blogId,
        content: newComment,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddReply = async (commentId) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/comments/reply/${commentId}`, {
        content: replyContent,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComments(comments.map(comment => comment._id === commentId ? data : comment));
      setReplyContent('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        rows={2}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>Submit</Button>
      <List>
        {comments.map(comment => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemText
              primary={comment.content}
              secondary={`By: ${comment.userId.name} on ${new Date(comment.createdAt).toLocaleString()}`}
            />
            <Box>
              <Button size="small" onClick={() => setReplyTo(comment._id)}>Reply</Button>
              {replyTo === comment._id && (
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={2}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Add a reply"
                  />
                  <Button variant="contained" color="primary" onClick={() => handleAddReply(comment._id)}>Submit</Button>
                </Box>
              )}
              <List>
                {comment.replies.map(reply => (
                  <ListItem key={reply._id} alignItems="flex-start">
                    <ListItemText
                      primary={reply.content}
                      secondary={`By: ${reply.userId.name} on ${new Date(reply.createdAt).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
