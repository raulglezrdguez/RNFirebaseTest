import React, {useCallback, useReducer} from 'react';

import UserReducer from './userReducer';
import UserContext from './userContext';

import * as types from './types';

const UserState = props => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUser = useCallback(user => {
    dispatch({type: types.SET_USER, payload: user});
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
