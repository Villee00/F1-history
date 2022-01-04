import React, { createContext, useReducer } from "react"
import { reducer } from "./reducer"

export const NotificationContext = React.createContext({
  state: {severity: "", message:""},
  dispatch: () => null
});


export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {severity: "", message:""})

  const value = {
    severity: state.severity,
    message: state.message,
    setError: (message)=>{
      dispatch({type: 'error', message})
    },
    setInfo: (message)=>{
      dispatch({type: 'info', message})
    },
    setSuccess: (message)=>{
      dispatch({type: 'success', message})
    },
    clear: ()=>{
      dispatch({type: 'clear'})
    }
  };
  return (
    <NotificationContext.Provider value={value}>
    	{ children }
    </NotificationContext.Provider>
  )
}