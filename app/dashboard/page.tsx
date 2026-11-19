import type { Metadata } from 'next';
import { StatsCard } from '@/components/stats-card';
import { RecentVacanciesCard } from '@/components/recent-vacancies-card';
import { VacancyOfTheDayCard } from '@/components/vacancy-of-the-day-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Обзор',
};

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Обзор</h1>

			{/* TODO: задача 5 — error boundary на каждый блок (BlockError). Сейчас упавший запрос роняет всю страницу. */}

			<Suspense fallback={"Загрузка статистики…"}>
				<StatsCard />
			</Suspense>

			<div className="grid gap-6 md:grid-cols-2">
				<Suspense fallback={"Загрузка свежих вакансий…"}>
					<RecentVacanciesCard />
				</Suspense>

				<Suspense fallback={"Загрузка вакансии дня…"}>
					<VacancyOfTheDayCard />
				</Suspense>
			</div>
		</div>
	);
};
