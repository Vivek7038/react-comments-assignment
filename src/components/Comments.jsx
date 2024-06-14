import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import {
  fetchComments,
  updateCommentLike,
  updateCommentText,
} from "../api/apiCalls";
import { baseUrl } from "../api/apiCalls";

const Comments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

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

  const handleLikeToggle = async (commentId) => {
    const updatedComments = [...comments];
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId);

    if (commentIndex !== -1) {
      const comment = updatedComments[commentIndex];
      if (!comment.likedBy.includes(user.id)) {
        comment.likes++;
        comment.likedBy.push(user.id);
        setComments(updatedComments);
      } else {
        comment.likes--;
        comment.likedBy = comment.likedBy.filter((id) => id !== user.id);
        setComments(updatedComments);
      }
      try {
        // Make API call to update like of the comment
        await updateCommentLike(baseUrl, commentId, comment);
      } catch (error) {
        console.error("Error updating comments likes", error);
        setError("Error updating comment like. Please try again later.");
      }
    }
  };

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setNewCommentText(commentToEdit.text);
    }
  };

  const handleUpdate = async (commentId) => {
    // if user tries to add empty comment , restrict update
    if (newCommentText.trim() === "") {
      setEditingCommentId(null);
      return;
    }

    const updatedComments = [...comments];
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId);

    if (commentIndex !== -1) {
      const comment = updatedComments[commentIndex];
      comment.text = newCommentText;
      setComments(updatedComments);
      setEditingCommentId(null);
      setNewCommentText("");
      try {
        await updateCommentText(baseUrl, commentId, comment);
      } catch (error) {
        console.error("Error updating comment text", error);
        setError("Error updating comment text. Please try again later.");
      }
    }
  };

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
            {editingCommentId === comment.id ? (
              <>
                <TextField
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(comment.id)}
                  sx={{ mt: 1 }}
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1">{comment.text}</Typography>
                <Typography variant="caption" color="blue">
                  Likes: {comment.likes}
                </Typography>
              </>
            )}
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
