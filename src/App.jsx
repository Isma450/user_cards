import { useState, useEffect } from "react";
import { Card } from "./component/Card/card";
import axios from "axios";
import "./App.css";

function App() {
  // I useState to get data from localStorage to avoid multiple API calls
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem("data");
    return localData ? JSON.parse(localData) : null;
  });

  // I use this state to display a loading message while fetching data from API
  // and an error message if an error occurs
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  // I use useEffect to fetch data from API and store it in localStorage with data as dependency to avoid infinite api calls
  useEffect(() => {
    // I use this clause Guard to avoid multiple API calls
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
