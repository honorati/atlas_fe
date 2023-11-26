export const getStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);

  if (localStorageData) {
    try {
      return localStorageData;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    const sessionStorageData = sessionStorage.getItem(key);

    if (sessionStorageData) {
      try {
        return sessionStorageData;
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      return null;
    }
  }
};
