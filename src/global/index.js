import React from 'react';

export const GlobalContext = React.createContext(null);
export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, isAuth: true };
    case 'logout':
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
