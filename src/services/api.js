import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8009";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const findMatchesForUrl = async (postUrl) => {
  try {
    const response = await API.post("/scrape_and_match", { post_url: postUrl });
    return response.data;
  } catch (error) {
    console.error("Error finding matches:", error);
    throw error;
  }
};

export default API;










