import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
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
          <h1 className="text-4xl font-semibold mb-8">Register</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-gray-200 text-black focus:outline-2 focus:outline-offset-2 focus:outline-[#d20d3b]"
              />
            </div>

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

            <button className="w-full py-3 rounded-xl bg-[#d20d3b] cursor-pointer hover:scale-101 transition ease-in font-medium">
              Register
            </button>
          </form>
          <p className="mt-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#d20d3b]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
