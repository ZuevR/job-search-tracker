export type Stats = {
	totalVacancies: number;
	remoteVacancies: number;
	newLast24h: number;
	avgSalaryFrom: number;    // средняя нижняя граница среди вакансий с зарплатой
	topCities: { name: string; count: number }[]; // топ-5
	topTags: { name: string; count: number }[];   // топ-5
	generatedAt: string;      // ISO 8601, момент ответа
};

export type Vacancy = {
	id: string;               // "v-001"
	title: string;            // "Senior Next.js-разработчик"
	companyId: string;        // "c-02" → GET /api/companies/c-02
	companyName: string;
	city: string;
	remote: boolean;
	salaryFrom: number | null; // в рублях
	salaryTo: number | null;
	currency: 'RUB';
	tags: string[];
	source: 'jobboard' | 'telegram' | 'career-site' | 'referral';
	publishedAt: string;      // ISO 8601
	description: string;
};

export type VacancyPreview = Omit<Vacancy, 'description'>;

export type VacancyList = {
	items: VacancyPreview[];
	page: number;
	limit: number;
	total: number;            // всего найдено с учётом фильтров
	totalPages: number;       // минимум 1
};

export type Company = {
	id: string;               // "c-01"
	name: string;
	city: string;
	size: '1-50' | '51-200' | '201-1000' | '1000+';
	field: string;
	rating: number;           // 3.2–4.9
	website: string;
	description: string;
};

async function request<T>(path: string): Promise<T> {
	if (!process.env.AGGREGATOR_URL) {
		throw new Error('Missing required env variable: AGGREGATOR_URL');
	}

	const response = await fetch(`${ process.env.AGGREGATOR_URL }${ path }`);

	if (!response.ok) {
		throw new Error(`[GET ${ path }] Response status: ${ response.status }`);
	}

	return response.json();
}

export function getStats() {
	return request<Stats>('/stats');
}

export type QueryConfig = {
	limit?: number;
	q?: string;
	remote?: boolean;
	page?: number;
}

export function getVacancies({ limit, page, q, remote }: QueryConfig = {}) {
	const urlParams = new URLSearchParams({
		...(limit !== undefined && { limit: String(limit) }),
		...(q !== undefined && { q }),
		...(remote !== undefined && { remote: String(remote) }),
		...(page !== undefined && { page: String(page) }),
	});

	const qs = urlParams.toString();

	const path = qs ? `/vacancies?${qs}` : '/vacancies';

	return request<VacancyList>(path);
}

export function getVacancy(id: string) {
	const encodedId = encodeURIComponent(id);

	return request<Vacancy>(`/vacancies/${encodedId}`);
}

export function getCompany(id: string) {
	const encodedId = encodeURIComponent(id);

	return request<Company>(`/companies/${encodedId}`);
}