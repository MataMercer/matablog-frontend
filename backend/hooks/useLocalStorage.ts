import React, { useState, useEffect } from 'react';

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (localStorage.getItem(key)) {
      setValue(
        (localStorage.getItem(key) as string).replace(/^"(.*)"$/, '$1') as any
      );
    }
  }, []);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  const setValueInLocalStorage = (newValue: any) => {
    setValue((currentValue: any) => {
      const result =
        typeof newValue === 'function' ? newValue(currentValue) : newValue;

      console.log(`Set local value in storage: ${JSON.stringify(result)}`);
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage] as const;
};

export default useLocalStorage;
