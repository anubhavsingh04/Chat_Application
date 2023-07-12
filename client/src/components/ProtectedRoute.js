import { React, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { toast } from "react-hot-toast";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>
    <h1>{user?.name}</h1>
    <h1>{user?.email}</h1>
  {children}
  </div>;
}

export default ProtectedRoute;

