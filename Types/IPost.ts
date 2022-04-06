import IBaseModel from './IBaseModel';
import IBlog from './IBlog';
import IFile from './IFile';
import ILike from './ILike';
import IPostTag from './IPostTag';

export default interface IPost extends IBaseModel {
  parentPostId: string;
  title: string;
  content: string;
  postTags: IPostTag[];
  attachments?: IFile[];
  createdAt?: string;
  updatedAt?: string;
  communityTaggingEnabled: boolean;
  sensitive: boolean;
  published: boolean;
  blog: IBlog;
  likes: ILike[];
  replies: IPost[];
}
