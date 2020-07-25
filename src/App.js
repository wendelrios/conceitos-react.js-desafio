import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [list, setList] = useState([])

  async function handleAddRepository() {
    await api.post('/repositories', {
      title:"bootcamp",
      url:"https://github.com/wendelrios/bootcamp",
      techs:[
        "Node JS",
        "Express",
        "React"
      ]
    }).then(response => setList([...list, response.data]))
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`, {
      data:{id}
    })
    setList(list.filter(repository => repository.id !== id))
  } 

  useEffect(() => {

    let mounted = true

    const getRepositories = async () => {
      const response = await api.get('/repositories')
      if(mounted){
        setList(response.data)
      }
    }
    getRepositories()

    return () => {
      mounted = false;
    }
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
      {list.map(repository => <li key={repository.id}>{repository.title}<button onClick={()=>handleRemoveRepository(repository.id)}>Remover</button></li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
