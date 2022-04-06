import * as types from './types';

const UserReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.SET_USER:
      return {...state, user: payload};

    default:
      return state;
  }
};

export default UserReducer;
