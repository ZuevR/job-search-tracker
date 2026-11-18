import NavLink from '@/components/nav-link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const links = [
	{ href: '/dashboard', label: 'Обзор', exact: true },
	{ href: '/dashboard/vacancies', label: 'Вакансии' },
	{ href: '/dashboard/applications', label: 'Отклики' },
];

export default function DashboardNav() {
	return (
		<nav className="space-y-1 border-t pt-3">
			{ links.map(({ exact, href, label }) => {
				return (
					<NavLink
						key={ href }
						exact={ exact }
						href={ href }
						className={ cn(buttonVariants({ variant: 'ghost' }), 'flex px-3 justify-start hover:text-primary') }
						activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
					>
						{ label }
					</NavLink>
				);
			}) }
		</nav>
	);
}