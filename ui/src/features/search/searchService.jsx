import axios from "axios";

const API_URL = '/api/search/';

export const searchAPI = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
