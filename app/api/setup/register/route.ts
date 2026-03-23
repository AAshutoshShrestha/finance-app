// app/api/setup/register/route.ts
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		console.log("register payload:", { email, password });

		if (!email || !password) {
			return Response.json({ error: "Missing fields" }, { status: 400 });
		}

		const existing = await prisma.user.findUnique({
			where: { email },
		});

		if (existing) {
			return Response.json({ error: "User exists" }, { status: 400 });
		}

		const hashed = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				email,
				password: hashed,
			},
		});

		return Response.json({ success: true });
	} catch (error) {
		console.error("REGISTER ERROR:", error); // 👈 IMPORTANT
		return Response.json({ error: "Server error" }, { status: 500 });
	}
}
