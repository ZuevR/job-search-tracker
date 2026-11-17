import NavLink from '@/components/nav-link';

const links = [
	{ href: '/dashboard', label: 'Обзор', exact: true },
	{ href: '/dashboard/vacancies', label: 'Вакансии' },
	{ href: '/dashboard/applications', label: 'Отклики' },
];

export default function DashboardNav() {
	return (
		<nav className="space-y-1 border-t border-gray-100 pt-3">
			{ links.map(({ exact, href, label }) => {
				return (
					<NavLink
						key={ href }
						exact={ exact }
						href={ href }
						className="block rounded-lg px-3 py-2 text-sm font-medium transition"
						activeClassName="bg-indigo-50 text-indigo-700"
						inactiveClassName="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
					>
						{ label }
					</NavLink>
				);
			}) }
		</nav>
	);
}