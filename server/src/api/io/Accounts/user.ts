import { User } from "models";
import { genToken } from "user";
import { userInterface } from "Shared/schemas/User";
import { invalidCredentials } from "Shared/types/Basic/LogIn";
export const getUserLoggin = async (token, username, password) => {
  if (token !== undefined)
    return (
      (await User.findOne(
        {
          mobileDeviceToken: token
        },
        "-password -mobileTokens -email -parentEmail -phone"
      )) || invalidCredentials
    );
  const user: userInterface = await User.findOne({
    username
  });
  if (await user.comparePassword(password)) {
    return {
      ...user,
      mobileDeviceTokens: undefined,
      password: undefined
    };
  }
};

export const logoutUser = () => true;
