import DashboardNav from '@/components/dashboard-nav';

export default function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="lg:flex lg:gap-8">
				<aside className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
					<div
						className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24"
					>
						<p className="px-1 text-sm font-semibold text-gray-900">
							Личный кабинет
						</p>

						<input
							type="search"
							placeholder="Быстрый поиск"
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
						/>

						<DashboardNav />
					</div>
				</aside>

				<main className="min-w-0 flex-1">{ children }</main>
			</div>
		</div>
	);
}