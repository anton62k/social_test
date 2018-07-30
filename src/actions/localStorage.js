export const LOCAL_STORAGE_TOKEN = 'LOCAL_STORAGE_TOKEN';

const { localStorage } = window;

const removeToken = () => {
  if (localStorage) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  }
};

const getToken = () => {
  if (localStorage) {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }
  return null;
};

const setToken = (token) => {
  if (localStorage) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  }
};

export default {
  setToken,
  removeToken,
  getToken,
};
