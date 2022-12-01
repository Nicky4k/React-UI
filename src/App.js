import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setData(res.data);
      uniqueUsers(data);
    });
  });

  const uniqueUsers = (usersData) => {
    usersData.forEach((usr) => {
      if (!users.includes(usr.userId)) {
        setUsers([usr.userId, ...users]);
      }
    });
  };

  const setoneUserHandler = (e) => {
    setTitle([]);
    setTitle(data.filter((usr) => usr.userId === +e.target.value));
  };

  return (
    <div className="App">
      <h1>Axios Get</h1>
      <article className="article__container">
        <label for="users">Choose a UserId: </label>

        <select onChange={setoneUserHandler} name="users" id="users">
          {users.map((u) => (
            <option value={u}>{u}</option>
          ))}
        </select>
      </article>
      {title &&
        title.map((t, i) => (
          <p className="user__title" id={i}>
            {t.title}
          </p>
        ))}
    </div>
  );
}
