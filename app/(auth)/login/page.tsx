/* eslint-disable @typescript-eslint/no-explicit-any */
// app\(auth)\login\page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Logged in");
        window.location.href = "/app";
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error:any) {
      toast.error("Something went wrong," + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md border-4 border-black shadow-[8px_8px_0px_#000] p-8">

        {/* Title */}
        <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight">
          <FaSignInAlt className="text-2xl" />
          Login
        </h1>

        {/* Divider */}
        <div className="h-0.75 bg-black w-full my-6"></div>

        {/* Email */}
        <input
          placeholder="EMAIL"
          className="w-full border-4 border-black p-3 text-lg font-bold placeholder:text-black outline-none focus:bg-black focus:text-white transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full border-4 border-black p-3 text-lg font-bold mt-4 placeholder:text-black outline-none focus:bg-black focus:text-white transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-6 border-4 border-black bg-black text-white font-black text-lg py-3 
          hover:bg-white hover:text-black transition 
          active:translate-x-0.75 active:translate-y-0.75 active:shadow-none
          shadow-[6px_6px_0px_#000]"
        >
          {loading ? "LOADING..." : "LOGIN"}
        </button>

      </div>
    </div>
  );
}