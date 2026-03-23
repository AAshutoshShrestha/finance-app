// app/api/setup/org/route.ts
import { prisma } from "@/lib/prisma/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return Response.json(
        { error: "Name required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true });

    const user = await prisma.user.findFirst();

    if (!user) {
      return Response.json(
        { error: "No admin user found" },
        { status: 400 }
      );
    }

    const org = await prisma.organization.create({
      data: {
        name,
        slug,
      },
    });

    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: org.id,
      },
    });

    return Response.json({ success: true });

  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}