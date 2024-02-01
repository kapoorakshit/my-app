import axios, { AxiosResponse } from "axios";
import { ResponseResult } from "../interfaces/ResponseResult";
import { baseUrl } from "../constants/Urls";

export const sendData = async <T,>(url: string, data: any) => {
  const result: ResponseResult = {
    data: {},
    isSuccessfull: false,
    error: "",
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(`${baseUrl}${url}`, data, config)
    .then((response: AxiosResponse<T>) => {
      result.isSuccessfull = true;
      result.data = response.data;
      return result;
    })
    .catch((error) => {
      result.isSuccessfull = false;
      result.error =
        (error.response && error.response.data) ??
        "An error has occured while processing the request.";
      result.data =
        error.response && error.response.data ? error.response.data : "";
      return result;
    });
};

export const getData = async <T,>(url: string) => {
  const result: ResponseResult = {
    data: {},
    isSuccessfull: false,
    error: "",
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${baseUrl}${url}`, config)
    .then((response: AxiosResponse<T>) => {
      result.isSuccessfull = true;
      result.data = response.data;
      return result;
    })
    .catch((error) => {
      result.isSuccessfull = false;
      result.error = "An error has occured while fetching the request";
      result.data =
        error.response && error.response.data ? error.response.data : "";
      return result;
    });
};

export const putData = async <T,>(url: string, data: any) => {
  const result: ResponseResult = {
    data: {},
    isSuccessfull: false,
    error: "",
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .put(`${baseUrl}${url}`, data, config)
    .then((response: AxiosResponse<T>) => {
      result.isSuccessfull = true;
      result.data = response.data;
      return result;
    })
    .catch((error) => {
      result.isSuccessfull = false;
      result.error =
        (error.response && error.response.data) ??
        "An error has occured while processing the request.";
      result.data =
        error.response && error.response.data ? error.response.data : "";
      return result;
    });
};
