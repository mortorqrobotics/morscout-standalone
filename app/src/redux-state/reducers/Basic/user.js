export default (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case "login":
      return Object.assign({}, state, {
        loggedIn: true,
        name: "Elias Schablowski",
      });
    case "logout":
      return Object.assign({
        loggedIn: false,
      });
    default:
      return state;
  }
};
