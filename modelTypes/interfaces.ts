export type Post = {
  id?: string;
  title: string;
  content: string;
  tags: { [name: string]: true };
  pictureUrls: string[];
};
