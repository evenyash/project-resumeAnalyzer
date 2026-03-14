import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
