'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/dashboard', label: 'Обзор' },
	{ href: '/dashboard/vacancies', label: 'Вакансии' },
	{ href: '/dashboard/applications', label: 'Отклики' },
];

export default function DashboardNav() {
	const pathname = usePathname();

	return (
		<nav className="space-y-1 border-t border-gray-100 pt-3">
			{ links.map(({ href, label }) => {
				const active =
					href === '/dashboard'
						? pathname === '/dashboard'
						: pathname.startsWith(href);

				return (
					<Link
						key={ href }
						href={ href }
						aria-current={ active ? 'page' : undefined }
						className={ `block rounded-lg px-3 py-2 text-sm font-medium transition ${
							active
								? 'bg-indigo-50 text-indigo-700'
								: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
						}` }
					>
						{ label }
					</Link>
				);
			}) }
		</nav>
	);
}