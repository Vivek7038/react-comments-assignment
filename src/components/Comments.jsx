import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import { fetchComments } from "../api/apiCalls";

const Comments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentsData = async () => {
      setLoading(true);
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        setError("Error fetching comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsData();
  }, []);

  const handleLikeToggle = async (commentId) => {};

  const handleEdit = (commentId) => {};

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
        Comments
      </Typography>
      {loading && <Typography variant="body2">Loading comments...</Typography>}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {comments.map((comment) => (
        <Box key={comment.id} mb={2} display="flex" alignItems="center">
          <Box flex="1">
            <Typography variant="body1">{comment.text}</Typography>
            <Typography variant="caption" color="blue">
              Likes: {comment.likes}
            </Typography>
          </Box>
          <IconButton
            onClick={() => handleLikeToggle(comment.id)}
            sx={{ ml: 1 }}
          >
            {comment.likedBy.includes(user.id) ? (
              <ThumbUpIcon style={{ color: "red" }} />
            ) : (
              <ThumbUpOutlinedIcon />
            )}
          </IconButton>
          <IconButton onClick={() => handleEdit(comment.id)} sx={{ ml: 1 }}>
            <EditIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default Comments;
