import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const TEMPID_URL = API_URL + "tempid/";

export const generateTempId = async () => { 
  const response = await axios.get(TEMPID_URL);
  return response.data;
};
