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

