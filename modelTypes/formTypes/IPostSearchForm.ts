import { PostCategory } from '../enums/PostCategory';

export interface IPostSearchForm {
  page?: number;
  pageSize?: number;
  blogName?: string;
  category?: PostCategory;
  tags?: string[];
}
