import { User } from "models";
import secureCompare from "secure-compare";
import { genToken } from "user";
import { invalidCredentials } from "shared/types/Basic/LogIn";
export const getUserLoggin = async (token, username, password) => {
  if (typeof token == "undefined")
    return (
      (await User.findOne(
        {
          mobileDeviceToken: token
        },
        "-password -mobileTokens -email -parentEmail -phone"
      )) || invalidCredentials
    );
  const user = await User.findOne(
    {
      username
    },
    "-password -mobileTokens -email -parentEmail -phone"
  );
  if (await user.comparePassword(password)) {
    return {
      ...user,
      mobileDeviceTokens: undefined,
      password: undefined
    };
  }
};

export const logoutUser = () => true;
