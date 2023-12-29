import InterfaceColor from './enums/InterfaceColors';
import IBaseModel from './IBaseModel';
import IFile from './IFile';

export default interface IBlogProfile extends IBaseModel {
  preferredBlogName?: string;
  aboutMe?: string;
  profileColorTheme?: InterfaceColor;
  interfaceColorTheme?: InterfaceColor;
  avatarUrl?: string;
  avatarFile?: IFile;
  location?: string;
  twitterLink?: string;
  githubLink?: string;
}
