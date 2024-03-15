export const setLocalStorage = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getLocalStorage = () => {
  localStorage.getItem("accessToken");
};

export const removeLocalStorage = () => {
  localStorage.removeItem("accessToken");
};
