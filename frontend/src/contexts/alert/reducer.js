export const reducer = (state, action) => {
  switch (action.type) {
  case 'error':
    return { severity: 'error', message: action.message };
  case 'info':
    return { severity: 'info', message: action.message };
  case 'success':
    return { severity: 'success', message: action.message };
  case 'clear':
    return { severity: 'success', message: null };
  default:
    throw Error('No action type in reducer of ' + action.type);
  }
};
