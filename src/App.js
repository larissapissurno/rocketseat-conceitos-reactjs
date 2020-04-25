import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(result => setRepositories(result.data));
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New Repository: ${Date.now()}`,
      url: "http://github.com/larissapissurno",
      techs: ["ReactJs"]
    };

    const repositoryResult = await api.post('repositories', newRepository);

    setRepositories([...repositories, repositoryResult.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const newRepositories = repositories.filter(repo => repo.id != id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
