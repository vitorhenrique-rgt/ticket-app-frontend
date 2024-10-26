import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userId = sessionStorage.getItem('userId');
  const isAdmin = sessionStorage.getItem('admin');

  // Verifica se o usuário está autenticado e se é admin
  if (!userId || isAdmin !== 'true') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
