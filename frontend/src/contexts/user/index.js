import React, { createContext, useReducer } from "react"
import { reducer, initialState } from "./reducer"

export const UserTokenContext = createContext({
  state: {
    token: null,
    favorites: [],
    username: null
  },
  dispatch: () => null
})

export const UserTokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    token: localStorage.getItem('f1history-token'),
    favorites: localStorage.getItem('f1history-favorites'),
    username: localStorage.getItem('f1history-username')
  })
  let favorites;
  try {
    favorites = JSON.parse(state.favorites);
  } catch (error) {
    favorites = state.favorites
  }
  const value = { 
    token: state.token,
    favorites: favorites,
    username: state.username,
    dispatch };
  return (
    <UserTokenContext.Provider value={value}>
      { children}
    </UserTokenContext.Provider>
  )
}