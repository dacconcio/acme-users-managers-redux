import React from 'react';
import Users from './Users.js';

export default function Managers(props) {
  const managerIds = props.users.map(user => user.ManagerId);
  const managers = props.users.filter(user => managerIds.includes(user.id));

  return <Users users={managers} />;
}
