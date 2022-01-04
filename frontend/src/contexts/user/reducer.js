export const reducer = (state, action) =>{
  switch(action.type) {
    case "set":
      return {
        token: action.token
      }
    case "remove":
      return {
        token: null
      }
    default:
      throw Error(`No action type in reducer of ${action.type}`)
  }
}

