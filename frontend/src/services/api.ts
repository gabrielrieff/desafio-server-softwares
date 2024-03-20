import axios from "axios";

export function apiClient() {
  const api = axios.create({
    baseURL: "http://localhost:3333/",
  });

  return api;
}

export const api = apiClient();
