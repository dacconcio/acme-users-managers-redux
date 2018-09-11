import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          {' '}
          <Link to="/users"> Users </Link>
        </div>
        <div>
          <Link to="/managers">Managers</Link>
        </div>
        <div>
          <Link to="/create">Create User</Link>
        </div>
        <div />
        <hr />
      </div>
    );
  }
}
