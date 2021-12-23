import IPost from '../IPost';

export interface IPostRequest extends IPost {
  files: File[];
}
