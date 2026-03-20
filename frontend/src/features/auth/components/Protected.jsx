import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <h1>Please wait for some time...</h1>
        <h1>
          The server is hosted on render in free tier. It may take some time to
          get started.
        </h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
