import { getVacancies } from '@/lib/aggregator';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { formatSalaryRange } from '@/lib/format-salary-range';

export async function RecentVacanciesCard() {
	const vacancies = await getVacancies({ limit: 5 });

	return (
		<Card>
			<CardHeader>
				<CardTitle>Свежие вакансии</CardTitle>
			</CardHeader>

			<CardContent>
				{ vacancies.items.length === 0 ? (
					<p className="text-sm text-muted-foreground">Пока пусто</p>
				) : (
					<ul className="divide-y">
						{ vacancies.items.map(({ id, salaryFrom, salaryTo, title, companyName, city }) => (
							<li
								key={ id }
								className="flex flex-wrap items-start justify-between gap-2 py-3 first:pt-0 last:pb-0"
							>
								<div className="min-w-0">
									<div className="font-medium">{ title }</div>
									<div className="text-sm text-muted-foreground">
										{ companyName } · { city }
									</div>
								</div>
								<div className="shrink-0 text-sm font-medium">
									{ formatSalaryRange({ salaryFrom, salaryTo }) }
								</div>
							</li>
						)) }
					</ul>
				) }
			</CardContent>
		</Card>
	);
}