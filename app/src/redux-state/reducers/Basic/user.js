export default (state = { loggedIn: false }, action) => {
  console.log(action);
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
};
