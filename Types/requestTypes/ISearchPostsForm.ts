import { PostCategory } from '../enums/PostCategory';

export interface ISearchPostsForm {
  page?: number;
  query?: string;
  pageSize?: number;
  blogName?: string;
  category?: PostCategory;
  tags?: string[];
}
