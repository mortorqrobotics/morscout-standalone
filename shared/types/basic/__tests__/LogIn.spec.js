import {
  login,
  loggedin,
  logout,
  loggedout,
  invalidCredentials
} from "../logIn";

test("login stays the same", () => {
  expect(login).toMatchSnapshot();
});

test("loggedin stays the same", () => {
  expect(loggedin).toMatchSnapshot();
});

test("logout stays the same", () => {
  expect(logout).toMatchSnapshot();
});

test("loggedout stays the same", () => {
  expect(loggedout).toMatchSnapshot();
});

test("invalid Credentials stay the same", () => {
  expect(invalidCredentials).toMatchSnapshot();
});
