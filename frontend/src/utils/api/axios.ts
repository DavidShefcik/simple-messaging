import axios from "axios";

export const api = axios.create({
  // @ts-ignore - __API_URL__
  baseURL: __API_URL__,
  timeout: 5000,
});
