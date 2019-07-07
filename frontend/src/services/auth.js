
export const TOKEN_KEY = "@todo-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUserId = (id) => {
  localStorage.setItem('userId', id)
}
export const getUserId = () => localStorage.getItem('userId')

export const deleteUserID = () => {
  localStorage.removeItem('userId')
}
