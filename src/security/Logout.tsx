import { useAuth } from "./Authprovider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  auth.signOut().then(() => {
    navigate("/");
  });
  return <></>;
}
