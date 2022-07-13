import IBaseModel from './IBaseModel';
import IBlog from './IBlog';

export default interface IFollow extends IBaseModel {
  follower: IBlog;
  followee: IBlog;
  notificationsEnabled: boolean;
  muted: boolean;
}
