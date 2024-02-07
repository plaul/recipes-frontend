import { useAuth } from "./Authprovider";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
  roles?: string[];
};
export default function RequireAuth({ children, roles }: Props) {
  const auth = useAuth();

  if (auth.skipSecurity()) return children;

  const location = useLocation();
  if (roles) {
    if (!auth.isLoggedInAs(roles)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
