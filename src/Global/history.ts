export const setKey = (key: string, value: any, stringify: boolean = true) => {
  if (!localStorage) {
    return;
  }
  try {
    const lsValue = stringify ? JSON.stringify(value) : value;
    localStorage.setItem(key, lsValue);
  } catch (error) {
    console.error('LOCAL STORAGE SAVE ERROR', error);
  }
};
export const removeKey = (key: string) => {
  if (!localStorage) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('LOCAL STORAGE REMOVE ERROR', error);
  }
};
export const getKey = (key: string) => {
  if (!localStorage) {
    return;
  }
  try {
    return JSON.parse(localStorage.getItem(key) + '');
  } catch (error) {
    console.error('LOCAL STORAGE FETCH ERROR', error);
  }
};

export const removeAllKeys = (keysObject: Record<string, string>) => {
  if (!keysObject || typeof keysObject !== 'object') {
    return;
  }
  Object.values(keysObject).forEach((key) => {
    removeKey(key);
  });
};
