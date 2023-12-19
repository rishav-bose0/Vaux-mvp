import React, { createContext } from "react";


export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});