import {
  login,
  loggedin,
  logout,
  loggedout,
  invalidCredentials
} from "../LogIn";

test("Login stays the same", () => {
  expect(login).toMatchSnapshot();
});

test("Loggedin stays the same", () => {
  expect(loggedin).toMatchSnapshot();
});

test("Logout stays the same", () => {
  expect(logout).toMatchSnapshot();
});

test("Loggedout stays the same", () => {
  expect(loggedout).toMatchSnapshot();
});

test("Invalid Credentials stay the same", () => {
  expect(invalidCredentials).toMatchSnapshot();
});
