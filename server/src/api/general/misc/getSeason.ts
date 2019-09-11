import { Season } from "models";

export default (year: number = new Date().getFullYear()): object => {
  return Season.findOne(
    {
      year
    },
    "+name +year"
  );
};
