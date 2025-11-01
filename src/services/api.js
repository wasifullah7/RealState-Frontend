import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8009",
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










