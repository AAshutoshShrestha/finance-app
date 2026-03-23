/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/setup/org/route.ts

import { prisma } from "@/lib/prisma/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const name = body?.name?.trim();

		if (!name) {
			return Response.json({ error: "Name required" }, { status: 400 });
		}

		// base slug
		const baseSlug = slugify(name, {
			lower: true,
			strict: true,
			trim: true,
		});

		// ensure unique slug (efficient query)
		const existing = await prisma.organization.findMany({
			where: {
				slug: {
					startsWith: baseSlug,
				},
			},
			select: { slug: true },
		});

		let slug = baseSlug;

		if (existing.length > 0) {
			const numbers = existing.map((o) => {
				const match = o.slug.match(/-(\d+)$/);
				return match ? parseInt(match[1], 10) : 0;
			});

			const next = Math.max(0, ...numbers) + 1;
			slug = `${baseSlug}-${next}`;
		}

		const user = await prisma.user.findFirst();

		if (!user) {
			return Response.json(
				{ error: "No admin user found" },
				{ status: 400 },
			);
		}

		await prisma.organization.create({
			data: {
				userId: user.id,
				name,
				slug,
			},
		});

		return Response.json({ success: true });
	} catch (error) {
		return Response.json({ error: "Server error" }, { status: 500 });
	}
}
