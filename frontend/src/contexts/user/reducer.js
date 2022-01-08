export const reducer = (state, action) => {
  switch (action.type) {
  case 'set':
    if (action.favorites && !action.token && !action.username)
      return {
        ...state,
        favorites: action.favorites
      };
    else
      return {
        token: action.token,
        favorites: action.favorites,
        username: action.username
      };
  case 'remove':
    return {
      token: null,
      favorites: [],
      username: null
    };
  default:
    throw Error(`No action type in reducer of ${action.type}`);
  }
};

