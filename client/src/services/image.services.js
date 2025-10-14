import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const IMAGES_URL = API_URL + "image/";

export const getImages = async () => {
  const response = await axios.get(IMAGES_URL);
  return response.data;
};

export const uploadImage = async (imageData, tempIdToken) => {
  const response = await axios.post(IMAGES_URL, imageData, {
    headers: {
      "x-tempid-token": tempIdToken, 
    },
  });
  return response.data;
};
