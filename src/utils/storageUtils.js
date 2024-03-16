export const setLocalStorage = (accessToken) => {
  return localStorage.setItem("accessToken", accessToken);
};

export const getLocalStorage = () => {
  return localStorage.getItem("accessToken");
};

export const removeLocalStorage = () => {
  return localStorage.removeItem("accessToken");
};
