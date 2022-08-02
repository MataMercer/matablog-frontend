import IBaseModel from './IBaseModel';
import IFile from './IFile';

export default interface IBlogProfile extends IBaseModel {
  aboutMe?: string;
  profileColorTheme?: string;
  interfaceColorTheme?: string;
  avatar?: IFile;
  location?: string;
  twitterLink?: string;
  githubLink?: string;
}
