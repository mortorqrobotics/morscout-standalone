import "mockingoose";
import mongoose from "mongoose";
import schema from "../User";

test("User is same throughout", async () => {
  expect.assertions(1);
  expect(schema).toMatchSnapshot();
});

test("User is a schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});

test("Compare Password functions", async () => {
  expect.assertions(2);
  const User = mongoose.model("User", schema);
  const user = new User({
    username: "mortorq",
    password: "Bananas",
    firstname: "mor",
    lastname: "torq",
    email: "a@a.com", // really need to stop (emails can be other than .com)
    phone: "1234567890",
    team: new mongoose.Types.ObjectId(),
    position: "alumnus"
  });
  await user.save();
  expect(await user.comparePassword("Bananas")).toBe(true);
  expect(await user.comparePassword("Barnanas")).toBe(false);
});

// test("User presave", async () => {
//   expect.assertions(1);
//   const User = mongoose.model("User", schema);
//   const user = new User({
//     username: "mortorq",
//     password: "Bananas",
//     firstname: "mor",
//     lastname: "torq",
//     email: "a@a.com", // really need to stop (emails can be other than .com)
//     phone: "1234567890",
//     team: new mongoose.Types.ObjectId(),
//     position: "alumnus"
//   });
//   await user.save();
//   await user.save();
//   expect(user.password).toBeTruthy();
// });
