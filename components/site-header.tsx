'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/', label: 'Главная' },
	{ href: '/dashboard', label: 'Кабинет' },
	{ href: '/login', label: 'Войти' },
];

export default function SiteHeader() {
	const pathname = usePathname();

	const isActive = (href: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href);

	return (
		<header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2">
					<span
						className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
						P
					</span>
					<span className="text-lg font-semibold tracking-tight text-gray-900">MyProject</span>
				</Link>

				<nav className="flex items-center gap-1">
					{ links.map(({ href, label }) => {
						const active = isActive(href);
						const isLogin = href === '/login';
						return (
							<Link
								key={ href }
								href={ href }
								aria-current={ active ? 'page' : undefined }
								className={
									isLogin
										? 'ml-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700'
										: `rounded-lg px-4 py-2 text-sm font-medium transition ${
											active
												? 'bg-indigo-50 text-indigo-700'
												: 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
										}`
								}
							>
								{ label }
							</Link>
						);
					}) }
				</nav>
			</div>
		</header>
	);
}
