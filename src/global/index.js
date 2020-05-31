import React from 'react';

export const GlobalContext = React.createContext(null);

export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      localStorage.setItem('tokenKhandemy', JSON.stringify(action.payload));
      return {
        ...state,
        isAuth: true,
        reqOptions: {
          headers: {
            Authorization: 'Bearer ' + action.payload.accessToken,
          },
        },
      };
    case 'logout':
      localStorage.removeItem('tokenKhandemy');
      return { ...state, isAuth: false, userData: null, reqOptions: null };
    case 'setUserData':
      return { ...state, userData: action.payload };
    default:
      return new Error('Something wrong, please try again');
  }
};
