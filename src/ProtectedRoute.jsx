import { useContext } from "react";
import { AuthProvider , AuthContext} from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user?.token) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
