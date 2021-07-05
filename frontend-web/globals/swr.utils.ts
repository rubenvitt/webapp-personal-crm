import axios from "../axios";
import { AxiosRequestConfig } from "axios";
import { Logger } from "./logging";

export const fetcher = <T>(
  ...args: [url: string, config?: AxiosRequestConfig]
): Promise<T> => {
  Logger.tagged("REQUEST", args[0]);
  return axios.get<T>(...args).then((res) => res.data);
};
