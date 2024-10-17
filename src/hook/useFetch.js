import { useState, useEffect } from "react";
import axios from "axios";

export const UseFetch = (Url) => {
  /**
   *I useState to get data from localStorage to avoid multiple API calls
   * @returns  {Array} data - data from localStorage or null
   */
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem("data");
    return localData ? JSON.parse(localData) : null;
  });

  /**
   * I use this state to display a loading message while fetching data from API
   * and an error message if an error occurs
   */
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  /**
   * I use useEffect to fetch data from the API if data is not null
   * and store it in localStorage
   * @returns {Array} data - data from the API
   * @returns {Boolean} loading - loading message
   * @returns {String} error - error message
   *
   */
  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const res = await axios.get(Url);
          setData(res.data);
          localStorage.setItem("data", JSON.stringify(res.data));
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [data]);

  return { loading, error, data };
};
