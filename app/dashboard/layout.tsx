import DashboardNav from '@/components/dashboard-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="lg:flex lg:gap-8">
				<aside className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
					<Card className="w-full shadow-md lg:sticky lg:top-24">
						<CardHeader>
							<CardTitle className="font-semibold text-sm">Личный кабинет</CardTitle>
						</CardHeader>

						<CardContent>
							<Input
								type="search"
								className="placeholder:text-muted-foreground/80 focus-visible:ring-1"
								placeholder="Быстрый поиск"
							/>

							<DashboardNav />
						</CardContent>
					</Card>
				</aside>

				<main className="min-w-0 flex-1">{ children }</main>
			</div>
		</div>
	);
}