import { User } from "models";
import IUser from "shared/schemas/user/interface";
import secureCompare from "secure-compare";
import { genToken, delToken } from "user";
import { invalidCredentials } from "shared/types/Basic/LogIn";

export interface IUserLogin extends IUser {
  token: string;
}

export const getUserLoggin = async (
  token,
  username,
  password
): Promise<IUserLogin> => {
  if (typeof token == "undefined") {
    let user = await User.findOne(
      {
        mobileDeviceToken: token
      },
      "-password -mobileTokens -email -parentEmail -phone"
    );
    if (!user) throw new Error(invalidCredentials);
    return Object.assign(user, { token: genToken(user) });
  }
  const user = await User.findOne(
    {
      username
    },
    "-password -mobileTokens -email -parentEmail -phone"
  );
  if (await user.comparePassword(password)) {
    return Object.assign(user, { token: genToken(user) });
  }
  throw new Error(invalidCredentials);
};

export const logoutUser = (token: string) => delToken(token);
