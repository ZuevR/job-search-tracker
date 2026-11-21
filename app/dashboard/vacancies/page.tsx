import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VacancyFilters, VacancyFiltersFromUrl } from '@/components/vacancies/vacancy-filters';
import { VacanciesList } from '@/components/vacancies/vacancies-list';

export const metadata: Metadata = {
	title: 'Вакансии',
};

export default function VacanciesPage({ searchParams }: PageProps<'/dashboard/vacancies'>) {
	return (
		<>
			<h1 className="text-2xl font-semibold">Вакансии</h1>

			<Suspense fallback={ <VacancyFilters /> }>
				<VacancyFiltersFromUrl searchParams={ searchParams } />
			</Suspense>

			<Suspense fallback={ <p className="text-sm text-muted-foreground">Загрузка…</p> }>
				<VacanciesList searchParams={ searchParams } />
			</Suspense>
		</>
	);
};
