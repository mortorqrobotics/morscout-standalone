import { setup, teardown } from "setup/mongoose";

import { User, Team } from "models";
import getUser from "../getUser";

beforeAll(setup);
afterAll(teardown);

test("getUser works the same as before", async () => {
  const team = await new Team({
    name: "MorTorq",
    number: 1515,
    location: { type: "Point", coordinates: [0, 0] },
    awards: new Map() // I don't want to write any right now
  }).save();
  const user = await new User({
    firstname: "Bob",
    lastname: "Boberson",
    username: "bobby",
    password: "%Secret%",
    phone: 1234567890,
    email: "bob@bob.bob",
    mobileDeviceTokens: ["Secret", "Also Secret"],
    team: team._id
  }).save();
  jest.spyOn(User, "findById");
  const userSave = await getUser(user._id);
  expect(User.findById).toHaveBeenCalledWith(
    user._id,
    expect.stringMatching(
      /[-password * -mobileDeviceTokens]|[-mobileDeviceTokens * -password]/
    )
  );
  expect(userSave).toEqual(
    expect.not.objectContaining({
      password: expect.anything(),
      mobileDeviceTokens: expect.anything()
    })
  );
});
