export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('persist:rootpal');
  window.location.assign(`${import.meta.env.VITE_APP_HOME_URL}/login`);
}