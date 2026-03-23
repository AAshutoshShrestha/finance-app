// Components\Navigation\sidebar.component.tsx
import clsx from "clsx";
import { useAppStore } from "@/lib/hooks/useAppStore";
import { useParams, useRouter } from "next/navigation";
import {
	BiBarChartAlt,
	BiCalendar,
	BiChevronRight,
	BiFolder,
	BiLayout,
	BiReceipt,
	BiUser,
	BiWallet,
} from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";

interface SidebarProps {
	currentPage: string;
	onNavigate: (page: string) => void;
}

const menuItems = [
	{ id: "dashboard", label: "Dashboard", icon: BiLayout, badge: null },
	{
		id: "transactions",
		label: "Transactions",
		icon: BiReceipt,
		badge: "New",
	},
	{ id: "categories", label: "Categories", icon: BiFolder, badge: null },
	{ id: "particulars", label: "Particulars", icon: BiUser, badge: null },
	{ id: "reports", label: "Reports", icon: BiBarChartAlt, badge: null },
	{ id: "timelines", label: "Timelines", icon: BiCalendar, badge: null },
	{ id: "settings", label: "Settings", icon: TbSettings, badge: null },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage }) => {
	const router = useRouter();
	const params = useParams();
	const organization = params.organization as string;

	const handleNavigation = (page: string) => {
		router.push(`/${organization}/${page}`);
	};

	const { sidebarOpen, toggleSidebar } = useAppStore();

	return (
		<>
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-20 animate-fade-in"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={clsx(
					"fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 ease-out",
					sidebarOpen
						? "translate-x-0"
						: "-translate-x-full lg:translate-x-0",
				)}
			>
				{/* Header */}
				<div className="h-16 flex items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50">
					<Link className="flex items-center gap-3" href="/">
						<div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
							<BiWallet className="w-5 h-5 text-white" />
						</div>
						<div>
							<h1 className="text-lg font-bold gradient-text">
								FinanceSaaS
							</h1>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Pro Edition
							</p>
						</div>
					</Link>
					<button
						onClick={toggleSidebar}
						className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
					>
						<IoIosClose size={20} className="text-gray-500" />
					</button>
				</div>

				{/* Navigation */}
				<nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
					<p className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
						Main Menu
					</p>
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = currentPage === item.id;

						return (
							<button
								key={item.id}
								onClick={() => handleNavigation(`${item.id}`)}
								className={clsx(
									"w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
									isActive
										? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
										: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
								)}
							>
								{isActive && (
									<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
								)}
								<div
									className={clsx(
										"p-2 rounded-lg transition-colors",
										isActive
											? "bg-white/20"
											: "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
									)}
								>
									<Icon size={18} />
								</div>
								<span className="font-medium flex-1 text-left">
									{item.label}
								</span>
								{item.badge && (
									<span
										className={clsx(
											"px-2 py-0.5 text-xs font-semibold rounded-full",
											isActive
												? "bg-white/20 text-white"
												: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
										)}
									>
										{item.badge}
									</span>
								)}
								<BiChevronRight
									size={16}
									className={clsx(
										"transition-transform",
										isActive
											? "rotate-90"
											: "opacity-0 group-hover:opacity-100",
									)}
								/>
							</button>
						);
					})}
				</nav>

				{/* Footer */}
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 dark:border-gray-700/50">
					<div className="bg-linear-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 rounded-xl p-4">
						<p className="text-sm font-medium text-gray-900 dark:text-white">
							Upgrade to Pro
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							Get advanced reports and analytics
						</p>
						<button className="mt-3 w-full px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-shadow">
							Upgrade Now
						</button>
					</div>
				</div>
			</aside>
		</>
	);
};
