import { useAuth } from "./Authprovider";
import { Link } from "react-router-dom";

export default function AuthStatus() {
  const auth = useAuth();
  // const navigate = useNavigate();
  if (auth.skipSecurity()) {
    return (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
  }
  if (!auth.isLoggedIn()) {
    return (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
  } else {
    return (
      <li>
        <Link to="/logout">Logout (Logged in as {auth.user?.username}) </Link>
      </li>
    );
  }
}
