import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";


interface AxiosReqParams {
  method?: Method;
  url: string;
  body?: any;
  withCredentials?: boolean;
}

interface UseAxiosReqParams {
  defaultValue?: any;
  method: Method;
  url: string;
  body?: any;
  dependency?: any[];
}

const axiosReq = async ({
  method = "POST",
  body,
  url,
  withCredentials = false,
}: AxiosReqParams): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      withCredentials,
      method,
      data: body,
      url,
    };
    const { data: result } = await axios(config);
    return result;
  } catch (error: any) {
    console.error("Axios Error: \n", error);
    throw new Error(error.message);
  }
};

const useAxiosReq = ({
  defaultValue = null,
  method,
  url,
  body,
  dependency = [],
}: UseAxiosReqParams) => {
  const [data, setData] = useState<any>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {result} = await axiosReq({ method, url, body });
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);

  return { data, setData, loading, setLoading, error };
};

export { useAxiosReq, axiosReq };
