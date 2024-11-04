import axios from "axios";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, data: action.data };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const UseAsyncState = (url) => {
  const initialState = {
    data: undefined,
    loading: false,
    error: undefined,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get(url);
        dispatch({ type: "SUCCESS", data: response.data });
      } catch (error) {
        dispatch({ type: "ERROR", error });
      }
    };
    fetchData();
  }, [url]);

  return state;
};
