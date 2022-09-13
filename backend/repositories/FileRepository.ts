/* eslint-disable import/prefer-default-export */
import { useMemo } from 'react';
import IFile from '../../Types/IFile';
import axiosApiConfig from '../config/AxiosApiConfig';

export function getFileUrls(files: IFile[]) {
  return files.map(
    (f) => `${axiosApiConfig.baseURL}files/serve/${f.id}/${f.name}`
  );
}
export function getFileUrl(file: IFile) {
  return `${axiosApiConfig.baseURL}files/serve/${file.id}/${file.name}`;
}
export function useFileUrl(fileId: string, fileName: string) {
  return useMemo(
    () => `${axiosApiConfig.baseURL}files/serve/${fileId}/${fileName}`,
    [fileId, fileName]
  );
}
