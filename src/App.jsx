import { useState, useEffect } from "react";
import { Card } from "./component/Card/card";
import axios from "axios";
import "./App.css";

function App() {
  /**
   *I useState to get data from localStorage to avoid multiple API calls
   * @returns  {Array} data - data from localStorage or null
   * ⚠️ btw : all this Api call can be stored in a custom hook but I stick with course content :)
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
          const res = await axios.get("https://randomuser.me/api/?results=10");
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue : {error.message}</div>;

  return (
    <div className="App">
      <h1>Liste des utilisateurs</h1>
      <div className="container">
        {data.results.map((user) => (
          <Card key={user.login.uuid} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
