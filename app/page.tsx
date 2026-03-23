import { prisma } from "@/lib/prisma/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
	const userCount = await prisma.user.count();
	
	if (userCount === 0) {
		redirect("/register");
	}

	const orgs = await prisma.organization.findMany();


	return (
		<div className="p-10">
			<h1 className="text-2xl mb-4">Organizations</h1>

			<Link
				href="/setup/add-organization"
				className="bg-black text-white px-4 py-2"
			>
				Add Organization
			</Link>

			<div className="grid grid-cols-3 gap-4 mt-6">
				{orgs.map((org) => (
					<div key={org.id} className="border p-4 rounded">
						<h2 className="text-lg">{org.name}</h2>

						<Link
							href={`/${org.slug}/dashboard`}
							className="bg-blue-600 text-white px-3 py-1 mt-2 inline-block"
						>
							Open App
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
