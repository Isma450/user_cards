import { Card } from "./component/Card/card";
import "./App.css";
import { UseFetch } from "./hook/useFetch";

function App() {
  /**
   * custom hook for the api call
   */
  const { loading, error, data } = UseFetch(
    "https://randomuser.me/api/?results=10"
  );

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
