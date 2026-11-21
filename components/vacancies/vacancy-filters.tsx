import Form from 'next/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseSearchParams, type VacanciesSearchParamsPromise } from '@/lib/vacancy-search-params';

type VacancyFiltersProps = {
	q?: string;
	remote?: boolean;
};

export function VacancyFilters({ q, remote }: VacancyFiltersProps) {
	return (
		<Form
			key={ `${ q ?? '' }|${ remote ?? '' }` }
			action="/dashboard/vacancies"
			className="my-4 flex flex-wrap items-end gap-4"
		>
			<label className="flex flex-col gap-1 text-sm">
				<span className="text-muted-foreground">Поиск</span>
				<Input
					type="search"
					name="q"
					defaultValue={ q ?? '' }
					placeholder="Название, компания, тег…"
				/>
			</label>

			<label className="flex flex-col gap-1 text-sm">
				<span className="text-muted-foreground">Формат</span>
				<select
					name="remote"
					defaultValue={ remote === undefined ? '' : String(remote) }
					className="h-9 w-30 rounded-md border border-input bg-transparent px-2.5 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
				>
					<option value="">Все</option>
					<option value="true">Удалённо</option>
					<option value="false">Офис</option>
				</select>
			</label>

			<Button type="submit">
				Найти
			</Button>
		</Form>
	);
}

export async function VacancyFiltersFromUrl({ searchParams }: { searchParams: VacanciesSearchParamsPromise }) {
	const { q, remote } = parseSearchParams(await searchParams);

	return <VacancyFilters q={ q } remote={ remote } />;
}
