import {useEffect, useState} from "react";
import {subscription, unsubscription, writeData} from "./service/chat.service.jsx";


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
    subscription("users", searchUser);
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
        <br/>
      </form>
      {usersList.map( u => <p key={u.key}>{u.username}</p>)}
      <br/>
    <button type="button" onClick={() => unsubscription("users")}>Unsub</button>
    <button type="button" onClick={() => subscription("users", searchUser)}>Sub</button>
      <br/>
    </>
  );
}

export default App;
