import { IPostTag } from './IPostTag';

export default interface IPost {
  id?: string;
  title: string;
  content: string;
  tags: IPostTag[];
  pictureUrls: string[];
  createdAt?: Date;
  updatedAt?: Date;
  communityTaggingEnabled: boolean;
  sensitive: boolean;
  published: boolean;
}
