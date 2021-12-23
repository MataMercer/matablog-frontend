import IBlog from "./IBlog";

export default interface IUser {
  id: string;
  username: string;
  activeBlog: IBlog;
};
