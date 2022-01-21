import UserAuthority from './UserAuthority';

const readerAuths: UserAuthority[] = [
  'FILE_READ',
  'BLOG_READ',
  'POST_READ',
  'POST_UPDATE',
  'POST_CREATE_COMMENT',
];
const bloggerAuths: UserAuthority[] = [
  ...readerAuths,
  'BLOG_CREATE',
  'BLOG_UPDATE',
  'FILE_CREATE',
  'FILE_UPDATE',
  'POST_CREATE_NEW',
];
const adminAuths: UserAuthority[] = [
  ...bloggerAuths,
  'USER_READ',
  'USER_WRITE',
  'USER_MANAGE',
];

type UserRole = 'READER' | 'ADMIN' | 'BLOGGER';
export default UserRole;

export const UserRoleAuths: Record<UserRole, UserAuthority[]> = {
  READER: readerAuths,
  ADMIN: adminAuths,
  BLOGGER: bloggerAuths,
};
