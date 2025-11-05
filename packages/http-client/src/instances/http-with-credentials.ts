import Axios from "axios";

export const httpWithCredentials = Axios.create({
  timeout: 30000,
  withCredentials: true,
});