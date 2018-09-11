import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.js';
import axios from 'axios';
import { updateUser, addUser, deleteUser, store, addUsers } from './store.js';
import Users from './Users.js';
import { Switch, HashRouter, Link, Route } from 'react-router-dom';
import Managers from './Managers.js';
import CreateUpdate from './CreateUpdate.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ users: store.getState().users })
    );

    axios
      .get('/users/api')
      .then(response => {
        store.dispatch(addUsers(response.data));
      })
      .catch(err => console.log(err));
  }

  deleteUser(userId) {
    axios
      .delete(`/users/api/${userId}`)
      .then(() => store.dispatch(deleteUser(userId)))
      .catch(err => console.log(err));
  }

  updateUser(userId, newName, newManagerId) {
    axios
      .put('/users/api', { userId, newName, newManagerId })
      .then(response => store.dispatch(updateUser(userId, response.data)))
      .catch(err => console.log(err));
  }

  createUser(name, managerId) {
    axios
      .post('/users/api', { name, managerId })
      .then(response => store.dispatch(addUser(response.data)))
      .catch(err => console.log(err));
  }

  render() {
    const { deleteUser, createUser, updateUser } = this;
    const { users } = this.state;

    return (
      <HashRouter>
        <div>
          <Route path="/" component={Nav} />

          <Switch>
            <Route
              exact
              path="/users"
              render={() => (
                <Users deleteFunc={deleteUser} users={state.users} />
              )}
            />

            <Route
              exact
              path="/users/:id"
              render={({ location }) => (
                <CreateUpdate
                  location={location}
                  users={users}
                  deleteFunc={deleteUser}
                  createFunc={createUser}
                  updateFunc={updateUser}
                />
              )}
            />
          </Switch>

          <Route
            exact
            path="/managers"
            render={() => <Managers deleteFunc={deleteUser} users={users} />}
          />

          <Route
            path="/create/"
            render={({ location }) => (
              <CreateUpdate
                location={location}
                users={users}
                deleteFunc={deleteUser}
                createFunc={createUser}
                updateFunc={updateUser}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
