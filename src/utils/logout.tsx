export const logoutUser = () => {
  localStorage.clear()
  window.location.assign(`${import.meta.env.VITE_APP_HOME_URL}/login`);
}