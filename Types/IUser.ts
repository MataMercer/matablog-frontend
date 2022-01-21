import UserAuthority from './enums/UserAuthority';
import UserRole from './enums/UserRole';
import IBlog from './IBlog';

export default interface IUser {
  id: string;
  username: string;
  activeBlog: IBlog;
  role: UserRole;
  authorities: UserAuthority[];
}
