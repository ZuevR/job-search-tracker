import Link from 'next/link';
import NavLink from '@/components/nav-link';
import { buttonVariants } from '@/components/ui/button';

const links = [
	{ href: '/', label: 'Главная', exact: true },
	{ href: '/dashboard', label: 'Кабинет' },
];

export default function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2">
					<span
						className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
						JT
					</span>
					<span className="text-lg font-semibold tracking-tight text-gray-900">Job Tracker</span>
				</Link>

				<nav className="flex items-center gap-1">
					{ links.map(({ href, label, exact }) =>
						(
							<NavLink
								key={ href }
								exact={ exact }
								href={ href }
								className="rounded-lg px-4 py-2 text-sm font-medium transition"
								activeClassName="bg-indigo-50 text-indigo-700"
								inactiveClassName="text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
							>
								{ label }
							</NavLink>
						)) }

					<Link href="/login" className={ buttonVariants({ variant: 'default' }) }>Войти</Link>
				</nav>
			</div>
		</header>
	);
}
