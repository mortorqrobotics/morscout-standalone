import { loggedin, loggedout } from "shared/types/basic/logIn";

export default (state = { loggedIn: false }, { type, data }) => {
  switch (type) {
    case loggedin:
      return Object.assign({}, state, {
        loggedIn: true,
        name: "Elias Schablowski",
        data
      });
    case loggedout:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};
