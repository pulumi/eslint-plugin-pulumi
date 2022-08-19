import * as path from "path";

export const getFixturesRootDir = () => {
  console.log(path.join(__dirname, "fixtures"));
  return path.join(__dirname, "fixtures");
};
