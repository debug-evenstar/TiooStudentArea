export const logoutUser = () => {
  localStorage.clear()
  window.location.href = `${import.meta.env.VITE_APP_HOME_URL}/login`
}