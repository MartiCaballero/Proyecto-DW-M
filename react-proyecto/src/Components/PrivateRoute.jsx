import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // Verificar si el usuario tiene un token

  // Si no hay token, redirigir a la página de login
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // Si el usuario está autenticado, mostrar la página protegida
  return children;
}

export default PrivateRoute;
