import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  fetchComments,
  updateCommentLike,
  updateCommentText,
} from "../api/apiCalls";
import { baseUrl } from "../api/apiCalls";
import CommentItem from "./CommentItem";
const CommentList = ({ user = { id: "", name: "Guest" } }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentsData = async () => {
      setLoading(true);
      try {
        //fetches all comments
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

  // function to like and unlike a comment
  const handleLikeToggle = async (commentId) => {
    const updatedComments = [...comments];
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId);

    if (commentIndex !== -1) {
      const comment = updatedComments[commentIndex];
      if (!comment.likedBy.includes(user.id)) {
        comment.likes++;
        comment.likedBy.push(user.id);
      } else {
        comment.likes--;
        comment.likedBy = comment.likedBy.filter((id) => id !== user.id);
      }
      setComments(updatedComments);
      try {
        await updateCommentLike(baseUrl, commentId, comment);
      } catch (error) {
        console.error("Error updating comments likes", error);
        setError("Error updating comment like. Please try again later.");
      }
    }
  };

  //function which updated the comment
  const handleUpdateComment = async (commentId, newText) => {
    const updatedComments = [...comments];
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId);

    if (commentIndex !== -1) {
      const comment = updatedComments[commentIndex];
      comment.text = newText;
      setComments(updatedComments);
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
        <CommentItem
          key={comment.id}
          comment={comment}
          user={user}
          onLikeToggle={handleLikeToggle}
          onUpdateComment={handleUpdateComment}
        />
      ))}
    </Box>
  );
};

export default CommentList;
