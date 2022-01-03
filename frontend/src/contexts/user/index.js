import React, { createContext, useReducer } from "react"
import { reducer, initialState } from "./reducer"

export const UserTokenContext = createContext({
  state: {token: null},
  dispatch: () => null
})

export const UserTokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {token: localStorage.getItem('f1history-token')})

  const value = {state, dispatch};
  return (
    <UserTokenContext.Provider value={value}>
    	{ children }
    </UserTokenContext.Provider>
  )
}