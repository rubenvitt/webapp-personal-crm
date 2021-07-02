import axios from "../axios";
import { AxiosRequestConfig } from "axios";

export const fetcher = <T>(
  ...args: [url: string, config?: AxiosRequestConfig]
): Promise<T> => {
  console.log("REQUEST:", args[0]);
  return axios.get<T>(...args).then((res) => res.data);
};
