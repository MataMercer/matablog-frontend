type UserAuths = 'USER_READ' | 'USER_WRITE' | 'USER_BAN' | 'USER_MANAGE';

type BlogAuths = 'BLOG_READ' | 'BLOG_CREATE' | 'BLOG_UPDATE' | 'BLOG_MANAGE';

type PostAuths =
  | 'POST_READ'
  | 'POST_CREATE_NEW'
  | 'POST_CREATE_COMMENT'
  | 'POST_UPDATE'
  | 'POST_MANAGE';

type FileAuths = 'FILE_READ' | 'FILE_CREATE' | 'FILE_UPDATE' | 'FILE_MANAGE';

type UserAuthority = UserAuths | BlogAuths | PostAuths | FileAuths;
export default UserAuthority;
