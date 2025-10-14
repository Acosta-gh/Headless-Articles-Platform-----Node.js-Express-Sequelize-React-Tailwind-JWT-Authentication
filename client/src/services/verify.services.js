import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const VERIFY_URL = API_URL + "verify";

export const verifyEmail = async (token) => {
  const response = await axios.post(`${VERIFY_URL}`, null, {
    params: { token },
  });
  return response.data;
};
