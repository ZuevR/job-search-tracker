import Link from 'next/link';
import NavLink from '@/components/nav-link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

const links = [
	{ href: '/', label: 'Главная', exact: true },
	{ href: '/dashboard', label: 'Кабинет' },
];

export default function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2">
					<span
						className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground"
					>
						JT
					</span>
					<span className="text-lg font-semibold tracking-tight text-foreground">Job Tracker</span>
				</Link>

				<div className="flex items-center gap-4">
					<nav className="flex items-center gap-4">
						{ links.map(({ href, label, exact }) =>
							(
								<NavLink
									key={ href }
									exact={ exact }
									href={ href }
									className={ cn(buttonVariants({ variant: 'ghost' }), 'px-4 hover:text-primary') }
									activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
								>
									{ label }
								</NavLink>
							)) }
					</nav>
					<Link href="/login" className={ buttonVariants({ variant: 'default' }) }>Войти</Link>

					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="secondary"
									aria-label="Меню пользователя"
									size="icon"
								>
									<User />
								</Button>
							}
						/>
						<DropdownMenuContent className="w-40" align="end">
							<DropdownMenuGroup>
								<DropdownMenuLabel>Имя Пользователя</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Профиль</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">Выйти</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
