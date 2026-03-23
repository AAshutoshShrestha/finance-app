export interface Organization {
	id: string;
	name: string;
	slug: string;
	created_at: Date;
}

export interface User {
	id: string;
	tenant_id: string;
	name: string;
	email: string;
	role: "admin" | "staff";
	avatar?: string;
}

export interface Account {
	id: string;
	tenant_id: string;
	name: string;
	type: "asset" | "liability" | "income" | "expense";
	code: string;
	parent_id?: string;
	balance: number;
}

export interface JournalEntry {
	id: string;
	tenant_id: string;
	ad_date: Date;
	bs_date: string;
	description: string;
	entry_number: string;
	created_by: string;
	created_at: Date;
}

export interface JournalLine {
	id: string;
	journal_entry_id: string;
	account_id: string;
	entry_type: "debit" | "credit";
	amount: number;
	description: string;
	debit: number;
	credit: number;
}

export interface Transaction {
	id: string;
	tenant_id: string;
	ad_date: Date;
	bs_date: string;
	amount: number;
	type: "income" | "expense";
	category_id: string;
	particular_id: string | null;
	notes: string;
	payment_method: string;
	timeline_id: string;
	created_at: Date;
	updated_at: Date;
	created_by: string;
}

export type TransactionWithDetails = Transaction & {
	category_name: string;
	particular_name: string | null;
};

export type AccountType = "asset" | "liability" | "income" | "expense";
export type EntryType = "debit" | "credit";
export type TransactionType = "income" | "expense";

export interface AccountBalance {
	account_id: string;
	account_name: string;
	account_code: string;
	account_type: AccountType;
	balance: number;
}

export interface Category {
	id: string;
	tenant_id: string;
	name: string;
	type: "income" | "expense";
	parent_id?: string | null;
	icon?: string;
	color?: string;
}

export interface CategoryWithChildren extends Category {
	children: Category[];
}

export interface Particular {
	id: string;
	tenant_id: string;
	name: string;
	type: "customer" | "vendor" | "employee" | "other";
	contact_info?: string | null;
	email?: string;
	phone?: string;
}

export interface Timeline {
	id: string;
	tenant_id: string;
	name: string;
	start_bs_date: string;
	end_bs_date: string;
	start_ad_date: Date;
	end_ad_date: Date;
	is_locked: boolean;
}

export interface ProfitLossReport {
	income: number;
	expense: number;
	net_profit: number;
	period: string;
	income_by_category: CategoryBreakdown[];
	expense_by_category: CategoryBreakdown[];
}

export interface BalanceSheetReport {
	assets: AccountBalance[];
	liabilities: AccountBalance[];
	equity: number;
	as_of_bs: string;
	as_of_ad: Date;
}

export interface MonthlyTrend {
	month: string;
	bs_month: string;
	income: number;
	expense: number;
	net: number;
}

export interface CategoryBreakdown {
	category_id: string;
	category_name: string;
	amount: number;
	percentage: number;
	transactions_count: number;
}

export interface TransactionFilters {
	start_date?: string;
	end_date?: string;
	category_id?: string;
	particular_id?: string;
	type?: "income" | "expense";
	payment_method?: string;
	timeline_id?: string;
	search?: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
	sort_by?: string;
	sort_order?: "asc" | "desc";
}

export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	total_pages: number;
}

export interface DashboardKPI {
	total_income: number;
	total_expense: number;
	net_balance: number;
	current_month_income: number;
	current_month_expense: number;
	income_change_percentage: number;
	expense_change_percentage: number;
	transaction_count: number;
}
