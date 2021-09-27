import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
const App = () => {
  const [val, setval] = useState({
    users: null,
    total: null,
    per_page: null,
    current_page: null,
  });
  const getData = async (page) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setval({
        users: data.data,
        total: data.total,
        per_page: data.per_page,
        current_page: data.page,
      });
      console.log(val);
    } catch (error) {
      console.log(error.message);
      console.log(val);
    }
  };

  let users, changepage;
  if (val.users !== null) {
    users = val.users.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.avatar}</td>
      </tr>
    ));
  }

  const nums = [];
  if (val.total !== null) {
    for (let i = 1; i <= Math.ceil(val.total / val.per_page); i++) {
      nums.push(i);
    }
  }

  useEffect(() => {
    getData(2);
  }, []);
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>

        <tbody>{users}</tbody>
      </table>

      <div
        className="btn-toolbar d-flex justify-content-center"
        role="toolbar"
        style={{ margin: 0 }}
      >
        <div className="btn-group ">
          {nums.map((num) => {
            return (
              <Button
                className="m-1"
                variant="primary"
                onClick={() => {
                  getData(num);
                }}
              >
                {num}
              </Button>
            );
          })}
          {/* {nums.map((itemval) => {
            return (
              <div className="todo-style">
                <i className="fa fa-edit" aria-hidden="true" title="edit"></i>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default App;
