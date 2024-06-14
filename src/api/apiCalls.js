import axios from "axios";

export const baseUrl = "https://666bb2d649dbc5d7145aea1a.mockapi.io/api";


export const fetchUsers = async () => {
       try {
              const response = await axios.get(`${baseUrl}/users`);
              return response.data;
       } catch (error) {
              throw new Error("Error fetching users ");
       }
};


export const fetchComments = async () => {
       try {
              const response = await axios.get(`${baseUrl}/comments`);
              return response.data;
       } catch (error) {
              throw new Error("Error fetching comments ");
       }
};

export const updateCommentLike = async (baseUrl, commentId, comment) => {
       try {
              const response = await axios.put(`${baseUrl}/comments/${commentId}`,
                     { likes: comment.likes, likedBy: comment.likedBy },
                     { headers: { 'Content-Type': 'application/json' } })
              return response.data;
       } catch (error) {
              throw new Error("Error updating comments likes");
       }
};

export const updateCommentText = async (baseUrl, commentId, comment) => {
       try {
              const response = await axios.put(`${baseUrl}/comments/${commentId}`,
                     { text: comment.text },
                     { headers: { 'Content-Type': 'application/json' } })
              return response.data;
       } catch (error) {
              throw new Error("Error updating comments text");
       }
};

