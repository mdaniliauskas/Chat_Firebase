import {useEffect, useState} from "react";
import {getObservable, writeData} from "./service/chat.service.jsx";


function App() {
  const [usersList, setUsersList] = useState([]);

  const handleSaveUser = async (e, name, email) => {
    e.preventDefault();
    await writeData(name, email);
  }

  const searchUser = (snapshot) => {
    setUsersList(snapshot);
  }

  useEffect(() => {
    getObservable("users", searchUser)
  }, [])


  return (
    <>
      <h1>App</h1>
      <form
        action=""
        onSubmit={(e) => handleSaveUser(e, userName.value, email.value)}
      >
        <label htmlFor="userName">Nome</label>
        <br/>
        <input type="text" name="name" id="userName"/>
        <br/>
        <label htmlFor="email">Email</label>
        <br/>
        <input type="text" name="email" id="email"/>
        <br/>
        <button type="submit">Enviar</button>
      </form>
      {usersList.map( u => <p key={u.key}>{u.username}</p>)}
    </>
  );
}

export default App;
