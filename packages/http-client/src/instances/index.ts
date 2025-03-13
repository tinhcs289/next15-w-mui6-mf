import Axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const http = Axios.create({
  timeout: 30000,
});

export const httpWithCredentials = Axios.create({
  timeout: 30000,
  withCredentials: true,
});

export const httpMock = Axios.create({
  timeout: 30000,
});

export const mockApdater = new AxiosMockAdapter(httpMock);