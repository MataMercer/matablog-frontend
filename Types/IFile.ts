import IBaseModel from './IBaseModel';

export default interface IFile extends IBaseModel {
  name: string;
  url: string;
}
