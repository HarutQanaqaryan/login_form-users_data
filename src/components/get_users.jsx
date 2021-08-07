import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import "./styles.css";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [rezervUsers, setRezervUsers] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [isRezervUsers, setIsrezervUsers] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((responce) => responce.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {

   return users.map((item) => {
      if (item.username === inputValue) {
        setRezervUsers([item]);
        setIsrezervUsers(true);
      } else if( inputValue === "") {
        setIsrezervUsers(false)
        setRezervUsers([])
      }
    });
  }, [inputValue]);

  return (
    <div>
      <h3>Users</h3>
      <TextField variant="outlined" type="search" onChange={({ target: { value }}) => setInputValue( value )} label="Search by username" />
      <div className="users-container">
        {!isRezervUsers
          ? users.map((item) => {
              return (
                <div className="user-cart" key={item.id}>
                  <p>
                    <span className="user-info">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="user-info">Username:</span> {item.username}
                  </p>
                  <p>
                    <span className="user-info">Email:</span> {item.email}
                  </p>
                  <p>
                    <span className="user-info">Phone:</span> {item.phone}
                  </p>
                  <p>
                    <span className="user-info">Web-site:</span> {item.website}
                  </p>
                </div>
              );
            })
          : rezervUsers.map((item) => {
              return (
                <div className="user-cart" key={item.id}>
                  <p>
                    <span className="user-info">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="user-info">Username:</span> {item.username}
                  </p>
                  <p>
                    <span className="user-info">Email:</span> {item.email}
                  </p>
                  <p>
                    <span className="user-info">Phone:</span> {item.phone}
                  </p>
                  <p>
                    <span className="user-info">Web-site:</span> {item.website}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};
