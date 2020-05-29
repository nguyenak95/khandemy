import React from 'react';

export const GlobalContext = React.createContext(null);

export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      localStorage.setItem('tokenKhandemy', JSON.stringify(action.payload));
      return { ...state, isAuth: true };
    case 'logout':
      localStorage.removeItem('tokenKhandemy');
      return { ...state, isAuth: false, userData: null };
    case 'setUserData':
      return { ...state, userData: action.payload}
    default:
      return new Error('Something wrong, please try again');
  }
};
