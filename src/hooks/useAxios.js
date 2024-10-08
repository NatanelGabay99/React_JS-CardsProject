import axios from "axios";
import { useEffect } from "react";
import { useSnack } from "../providers/SnackbarProvider";
import { useCurrentUser } from "./../users/providers/UserProvider";


export default function useAxios() {
  const snack = useSnack();
  const { token } = useCurrentUser();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
    const requestInterceptor = axios.interceptors.request.use((data) => {
      return Promise.resolve(data);
    }, null);

    const responseInterceptor = axios.interceptors.response.use(
      null,
      (error) => {
        if (error.message) snack("error", error.message);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [snack, token]);
}

