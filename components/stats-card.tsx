import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getStats, type Stats } from '@/lib/aggregator';
import { formatMoney } from '@/lib/format-salary-range';

const LABELS = {
	totalVacancies: 'Всего вакансий',
	remoteVacancies: 'Вакансий на удаленке',
	newLast24h: 'Новых за сутки',
	avgSalaryFrom: 'Средняя планка «от»',
} satisfies Partial<Record<keyof Stats, string>>;

export async function StatsCard() {
	const stats = await getStats();

	const entries = Object.entries(LABELS) as [keyof typeof LABELS, string][];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Статистика</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-4">
				{ entries.map(([key, value]) => (
					<div key={ key }>
						<div className="text-2xl font-bold tabular-nums">
							{ key === 'avgSalaryFrom'
								? formatMoney(stats[key])
								: stats[key].toLocaleString('ru-RU') }
						</div>
						<div className="text-sm text-muted-foreground">
							{ value }
						</div>
					</div>
				)) }
			</CardContent>
		</Card>
	);
}