import axios from "axios";
import IFile from "../../Types/IFile";

export function getFileUrls(files: IFile[]) {
  return files.map(f => `${axios.defaults.baseURL}files/serve/${f.id}/${f.name}`);
}