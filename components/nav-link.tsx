'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLinkProps = {
	activeClassName?: string;
	children?: React.ReactNode;
	className?: string;
	exact?: boolean;
	href: string;
}

export default function NavLink({
	activeClassName,
	children,
	className,
	exact = false,
	href,
}: NavLinkProps) {
	const pathname = usePathname();

	const isActive = exact
		? href === pathname
		: pathname.startsWith(href);

	return (
		<Link
			href={ href }
			aria-current={ isActive ? 'page' : undefined }
			className={
				cn(
					className,
					isActive && activeClassName,
				) }
		>
			{ children }
		</Link>
	);
}