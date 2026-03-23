"use client";
import { Layout } from "@/layout";
import { useState } from "react";
import { Toaster } from "react-hot-toast";


export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [currentView, setCurrentView] = useState("dashboard");
	return (
		<Layout currentPage={currentView} onNavigate={setCurrentView}>
			<Toaster position="top-right"/>
			{children}
		</Layout>
	);
}
