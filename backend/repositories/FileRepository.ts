/* eslint-disable import/prefer-default-export */
import IFile from '../../Types/IFile';
import axiosApiConfig from '../config/AxiosApiConfig';

export function getFileUrls(files: IFile[]) {
  return files.map(
    (f) => `${axiosApiConfig.baseURL}files/serve/${f.id}/${f.name}`
  );
}
