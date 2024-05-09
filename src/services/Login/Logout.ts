export function logoutUser() {
  localStorage.removeItem('token'); 
  window.location.href = '/'; // Redirige al usuario a la página de inicio de sesión
}