import { buildPageHref, parseSearchParams, type VacanciesSearchParamsPromise } from '@/lib/vacancy-search-params';
import { getVacancies } from '@/lib/aggregator';
import Link from 'next/link';
import { formatSalaryRange } from '@/lib/format-salary-range';

const PAGE_SIZE = 10;

export async function VacanciesList({ searchParams }: { searchParams: VacanciesSearchParamsPromise }) {
	const params = await searchParams;

	const { q, remote, page } = parseSearchParams(params);

	const { items, page: currentPage, totalPages, total } = await getVacancies({ q, page, remote, limit: PAGE_SIZE });

	const isEmpty = items.length === 0;
	const isPageNotFound = isEmpty && currentPage > totalPages && total > 0;
	const isNoResults = isEmpty && !isPageNotFound;

	return (
		<>
			{ isPageNotFound && (
				<div className="my-6 space-y-2 text-sm">
					<p className="text-muted-foreground">
						Страницы { currentPage } не существует — всего доступно { totalPages }.
					</p>
					<Link
						href={ buildPageHref({ page: 1, q, remote }) }
						className="font-medium text-foreground hover:underline"
					>
						← Перейти на первую страницу
					</Link>
				</div>
			) }

			{ isNoResults && (
				<p className="text-sm text-muted-foreground">
					Ничего не нашлось — попробуйте изменить фильтры.
				</p>
			) }

			{ !isEmpty && (
				<ul className="divide-y">
					{ items.map(({ id, title, companyName, city, remote: isRemote, salaryFrom, salaryTo, tags }) => (
						<li key={ id } className="flex flex-wrap items-start justify-between gap-2 py-3">
							<div className="min-w-0">
								<div className="font-medium">{ title }</div>
								<div className="text-sm text-muted-foreground">
									{ companyName } · { city }{ isRemote && ' · удалённо' }
								</div>
								<ul className="mt-2 flex flex-wrap gap-1">
									{ tags.map((tag) => (
										<li
											key={ tag }
											className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
										>
											{ tag }
										</li>
									)) }
								</ul>
							</div>
							<div className="shrink-0 text-sm font-medium">
								{ formatSalaryRange({ salaryFrom, salaryTo }) }
							</div>
						</li>
					)) }
				</ul>
			) }

			{ !isEmpty && totalPages > 1 && (
				<nav className="mt-6 flex items-center justify-between text-sm" aria-label="Пагинация">
					<div className="w-24">
						{ currentPage > 1 && (
							<Link href={ buildPageHref({ page: currentPage - 1, q, remote }) } className="hover:underline">
								← Назад
							</Link>
						) }
					</div>

					<span className="text-muted-foreground">Страница { currentPage } из { totalPages }</span>

					<div className="w-24 text-right">
						{ currentPage < totalPages && (
							<Link href={ buildPageHref({ page: currentPage + 1, q, remote }) } className="hover:underline">
								Вперёд →
							</Link>
						) }
					</div>
				</nav>
			) }
		</>
	);
}
