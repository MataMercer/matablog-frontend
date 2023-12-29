import IBaseModel from './IBaseModel';
import IBlog from './IBlog';

export default interface ILike extends IBaseModel {
  liker: IBlog;
  postId: string;
}
