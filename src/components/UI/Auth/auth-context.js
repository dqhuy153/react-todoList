import React from 'react';
const AuthContext =  React.createContext({
  isLoggedIn: false,
  onLogOut: ()=>{}, //dummy function ????
});
export default AuthContext;