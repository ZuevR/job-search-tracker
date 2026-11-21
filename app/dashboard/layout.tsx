import DashboardNav from '@/components/dashboard-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Form from 'next/form';

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
							<Form action="/dashboard/vacancies">
								<Input
									type="search"
									name="q"
									aria-label="Быстрый поиск по вакансиям"
									className="placeholder:text-muted-foreground/80 focus-visible:ring-1"
									placeholder="Быстрый поиск"
								/>
							</Form>
							<DashboardNav />
						</CardContent>
					</Card>
				</aside>

				<main className="min-w-0 flex-1">{ children }</main>
			</div>
		</div>
	);
}