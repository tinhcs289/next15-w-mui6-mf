import Axios from "axios";

export const http = Axios.create({
  timeout: 30000,
});