/* eslint-disable import/prefer-default-export */
export function objectToFormData(
  obj: Object,
  rootName?: string,
  ignoreList?: string[]
) {
  const formData = new FormData();

  function ignore(root: string) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some((x) => {
        return x === root;
      })
    );
  }

  function appendFormData(data: string | Object | null, root: string) {
    if (!ignore(root)) {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        data.forEach((it, i) => {
          appendFormData(it, `${root}[${i}]`);
        });
      } else if (typeof data === 'object' && data) {
        const keys = Object.keys(data);
        keys.forEach((key: string) => {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (root === '') {
              appendFormData((data as any)[key], key);
            } else {
              appendFormData((data as any)[key], `${root}.${key}`);
            }
          }
        });
      } else if (data !== null && typeof data !== 'undefined') {
        formData.append(root, data);
      }
    }
  }

  appendFormData(obj, rootName as any);

  return formData;
}
