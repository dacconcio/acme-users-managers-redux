import { createStore } from 'redux';

const ADD_USER = 'ADD_USER';
const ADD_USERS = 'ADD_USERS';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';

const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

const addUsers = users => {
  return {
    type: ADD_USERS,
    users
  };
};

const deleteUser = userId => {
  return {
    type: DELETE_USER,
    userId
  };
};

const updateUser = (userId, updatedUser) => {
  return {
    type: UPDATE_USER,
    userId,
    updatedUser
  };
};

const initialState = {
  users: []
};

function acmeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, { users: action.users });

    case DELETE_USER:
      const newUsersAfterDelete = state.users.filter(user => {
        return user.id !== action.userId;
      });

      return Object.assign({}, { users: newUsersAfterDelete });

    case ADD_USER:
      const newUsersAfterAdd = state.users;
      newUsersAfterAdd.push(action.user);
      return Object.assign({}, state, { users: newUsersAfterAdd });

    case UPDATE_USER:
      const newUsersAfterUpdate = state.users.map(user => {
        if (user.id === action.updatedUser.id) {
          return action.updatedUser;
        } else {
          return user;
        }
      });

      return Object.assign({}, state, newUsersAfterUpdate);

    default: {
      return state;
    }
  }
}

const store = createStore(acmeReducer);

export { updateUser, addUser, store, addUsers, deleteUser };
