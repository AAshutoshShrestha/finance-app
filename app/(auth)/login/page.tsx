"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";

export default function LoginPage(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async ()=>{

    const res = await fetch("/api/auth/login",{
      method:"POST",
      body: JSON.stringify({email,password})
    });

    if(res.ok){
      toast.success("Logged in");
      window.location.href="/app";
    }else{
      toast.error("Invalid credentials");
    }
  }

  return(
    <div className="p-10 max-w-md mx-auto">

      <h1 className="flex gap-2 text-xl">
        <FaSignInAlt/> Login
      </h1>

      <input
        className="border p-2 w-full mt-4"
        onChange={e=>setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mt-2"
        onChange={e=>setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-black text-white p-2 mt-4 w-full"
      >
        Login
      </button>

    </div>
  )
}