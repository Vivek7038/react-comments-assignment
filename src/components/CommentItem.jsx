import React, { useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";

const CommentItem = ({
  comment = { text: "", likes: 0, likedBy: [] },
  user = { id: "" },
  onLikeToggle = () => {},
  onUpdateComment = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentText, setNewCommentText] = useState(comment.text);
  const [updateError, setUpdateError] = useState("");

  const handleEdit = () => {
    if (isEditing) {
      return;
    }
    setIsEditing(true);
    setNewCommentText(comment.text);
  };

  const handleUpdate = () => {
    if (newCommentText.trim() === "") {
      setUpdateError("Comment text cannot be empty.");
      return;
    }
    onUpdateComment(comment.id, newCommentText);
    setIsEditing(false);
    setUpdateError("");
  };

  return (
    <Box mb={2} display="flex" alignItems="center">
      <Box flex="1">
        {isEditing ? (
          <>
            <TextField
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              fullWidth
              error={updateError !== ""}
              helperText={updateError}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
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
      <IconButton onClick={() => onLikeToggle(comment.id)} sx={{ ml: 1 }}>
        {comment.likedBy.includes(user.id) ? (
          <ThumbUpIcon style={{ color: "red" }} />
        ) : (
          <ThumbUpOutlinedIcon />
        )}
      </IconButton>
      <IconButton onClick={handleEdit} sx={{ ml: 1 }} disabled={isEditing}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default CommentItem;
