import IPost from '../IPost';

export interface IPostForm extends IPost {
  files:File[];
}
