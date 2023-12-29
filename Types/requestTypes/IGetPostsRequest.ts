import { PostCategory } from '../enums/PostCategory';
import { IPageRequest } from './IPageRequest';

interface IGetPostsFormCore {
  blogNames?: string[];
  category?: PostCategory;
  tags?: string[];
  following?: boolean;
}

type IGetPostsFormWithPage = IGetPostsFormCore & IPageRequest;

export type { IGetPostsFormWithPage as IGetPostsForm };
