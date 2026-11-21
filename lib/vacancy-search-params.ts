type ParsedVacanciesParams = {
	q: string | undefined;
	remote: boolean | undefined;
	page: number;
};

export type VacanciesSearchParamsPromise = PageProps<'/dashboard/vacancies'>['searchParams'];
export type VacanciesSearchParams = Awaited<VacanciesSearchParamsPromise>;

function pickOne(value: string | string[] | undefined): string | undefined {
	const raw = Array.isArray(value) ? value[0] : value;
	const trimmed = raw?.trim();

	return trimmed ? trimmed : undefined;
}

function parseBool(value: string | undefined) {
	if (value === 'true') {
		return true;
	}

	if (value === 'false') {
		return false;
	}

	return undefined;
}

export function parseSearchParams(params: VacanciesSearchParams): ParsedVacanciesParams {
	const q = pickOne(params.q);
	const remote = parseBool(pickOne(params.remote));

	const rawPage = Number(pickOne(params.page));
	const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

	return { q, remote, page };
}

export function buildPageHref({ q, remote, page }: ParsedVacanciesParams): string {
	const urlParams = new URLSearchParams();

	if (q !== undefined) {
		urlParams.set('q', q);
	}

	if (remote !== undefined) {
		urlParams.set('remote', String(remote));
	}

	if (page > 1) {
		urlParams.set('page', String(page));
	}

	const qs = urlParams.toString();
	return qs ? `/dashboard/vacancies?${ qs }` : '/dashboard/vacancies';
}
