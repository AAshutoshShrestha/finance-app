// app/(Setup)/register/page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const submit = async () => {
		if (!email || !password) {
			toast.error("All fields required");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch("/api/setup/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error);

			toast.success("Admin created");
			router.push("/setup/add-organization");
		} catch (err: any) {
			toast.error(err.message || "Failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
				<h1 className="text-2xl font-semibold flex items-center gap-2">
					<FaUserPlus /> Create Admin Account
				</h1>

				<p className="text-gray-500 text-sm mt-1">
					This will be your system owner account
				</p>

				<div className="mt-6 space-y-3">
					<input
						className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
						placeholder="Email address"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						onClick={submit}
						disabled={loading}
						className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
					>
						{loading ? "Creating..." : "Continue"}
					</button>
				</div>
			</div>
		</div>
	);
}
