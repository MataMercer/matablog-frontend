import IBaseModel from './IBaseModel';
import IBlogProfile from './IBlogProfile';

export default interface IBlog extends IBaseModel {
  blogName?: string;
  preferredBlogName?: string;
  isSensitive?: boolean;
  following?: boolean;
  follower?: boolean;
  followerCount?: number;
  followingCount?: number;
  blogProfile?: IBlogProfile;
}
