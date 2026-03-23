"use client"
import { KPICard } from "@/Components/Cards/KpiCards.component";
import { DashboardKPI } from "@/lib/const.interface";
import { BiAccessibility, BiTrendingDown, BiTrendingUp, BiWalletAlt } from "react-icons/bi";
import { useState } from "react";

export default function DashboardPage({params}: {params:{organization:string}}) {
	const [kpis] = useState<DashboardKPI>({
		total_income: 1250000,
		total_expense: 850000,
		net_balance: 400000,
		current_month_income: 185000,
		current_month_expense: 125000,
		income_change_percentage: 12.5,
		expense_change_percentage: -8.3,
		transaction_count: 247,
	});
	return (
		<div className="space-y-6 animate-fade-in">
			{/* Page Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
						Dashboard for {params.organization}
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-1">
						Welcome back! Here&apos;s your financial overview.
					</p>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full font-medium">
						Fiscal Year 2081/82
					</span>
				</div>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
				<KPICard
					title="Total Income"
					value={kpis.total_income}
					icon={BiTrendingUp}
					trend={kpis.income_change_percentage}
					color="yellow"
				/>
				<KPICard
					title="Total Expenses"
					value={kpis.total_expense}
					icon={BiTrendingDown}
					trend={kpis.expense_change_percentage}
					color="red"
					gradient="from-red-500 to-rose-600"
				/>
				<KPICard
					title="Net Balance"
					value={kpis.net_balance}
					icon={BiWalletAlt}
					color="blue"
					gradient="from-blue-500 to-indigo-600"
				/>
				<KPICard
					title="Transactions"
					value={kpis.transaction_count}
					icon={BiAccessibility}
					isCount
					color="purple"
					gradient="from-purple-500 to-violet-600"
				/>
			</div>
		</div>
	);
}
