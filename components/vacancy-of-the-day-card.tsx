import { getCompany, getVacancy } from '@/lib/aggregator';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export async function VacancyOfTheDayCard() {
	const vacancy = await getVacancy('v-001');
	const company = await getCompany(vacancy.companyId);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Вакансия дня</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<div className="text-lg font-semibold">{ vacancy.title }</div>
					<div className="text-sm text-muted-foreground">{ vacancy.city }</div>
				</div>

				<div className="rounded-md border p-3">
					<div className="font-medium">{ company.name }</div>
					<div className="text-sm text-muted-foreground">
						Рейтинг: { company.rating }
					</div>
				</div>
			</CardContent>
		</Card>
	);
}