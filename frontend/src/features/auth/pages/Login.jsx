import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../hooks/useAuth.js";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { user, loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return toast.error("All fields are necessary!");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (error) {
      navigate("/login");
    }

    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="h-full flex justify-center items-center px-4">
        <div className="w-full max-w-md text-gray-100 mt-24">
          <h1 className="text-4xl font-semibold mb-8">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-xl bg-gray-200 text-black focus:outline-2 focus:outline-offset-2 focus:outline-[#d20d3b]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-gray-200 text-black focus:outline-2 focus:outline-offset-2 focus:outline-[#d20d3b]"
              />
            </div>

            <div>
              <button className="w-full py-3 rounded-xl bg-[#d20d3b] cursor-pointer hover:scale-101 transition ease-in font-medium">
                Login
              </button>
            </div>
          </form>
          <p className="mt-2">
            New user?{" "}
            <Link to={"/register"} className="text-[#d20d3b]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
