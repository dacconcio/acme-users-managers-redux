import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
export default function Users(props) {
  return (
    <div>
      {props.users.map(user => {
        return (
          <div key={user.id}>
            <Link to={{ pathname: `/users/${user.id}`, state: user }}>
              {user.name}
            </Link>

            {user.ManagerId
              ? `Managed by ${props.users[user.ManagerId - 1].name}`
              : null}
            <button onClick={() => props.deleteFunc(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
