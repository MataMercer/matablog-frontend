import IBaseModel from './IBaseModel';
import IBlog from './IBlog';
import IFile from './IFile';
import IPostTag from './IPostTag';

export default interface IPost extends IBaseModel {
  parentPostId: string;
  title: string;
  content: string;
  postTags: IPostTag[];
  attachments?: IFile[];
  thumbImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  communityTaggingEnabled: boolean;
  sensitive: boolean;
  published: boolean;
  blog: IBlog;
  likeCount: number;
  replyCount: number;
  replies: IPost[];
}
