export const useToken = () => {
  const token = localStorage.getItem('token');
  if (token == "" || token == null) {
    return null;
  }

  return token;
}