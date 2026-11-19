// Framework-free router built on Web standard Request/Response.
// The same handle() runs locally (src/server.js) and on Vercel (api/*.js).

import { companies, vacancies } from './data.js';

// Default artificial latency per endpoint, ms. Different values make waterfalls easy to see.
const DEFAULT_DELAY = {
	health: 0,
	stats: 700,
	vacancies: 1000,
	vacancy: 500,
	company: 800,
};

const MAX_LIMIT = 50;
const FAIL_RATE = Number(process.env.AGGREGATOR_FAIL_RATE ?? 0);
const DELAY_SCALE = Number(process.env.AGGREGATOR_DELAY_SCALE ?? 1);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function json(status, body, extraHeaders = {}) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
			'access-control-allow-origin': '*',
			...extraHeaders,
		},
	});
}

const error = (status, code, message) => json(status, { error: { code, message } });

function parseIntParam(value, fallback) {
	if (value === null || value === '') return fallback;
	const n = Number(value);
	return Number.isInteger(n) ? n : NaN;
}

function listVacancies(params) {
	const q = params.get('q')?.trim().toLowerCase();
	const city = params.get('city')?.trim();
	const remote = params.get('remote');
	const tag = params.get('tag')?.trim().toLowerCase();
	const salaryFrom = parseIntParam(params.get('salaryFrom'), null);
	const sort = params.get('sort') ?? 'date';
	const page = parseIntParam(params.get('page'), 1);
	const limit = parseIntParam(params.get('limit'), 10);

	if (Number.isNaN(page) || page < 1) return error(400, 'bad_param', '`page` must be an integer >= 1');
	if (Number.isNaN(limit) || limit < 1 || limit > MAX_LIMIT) {
		return error(400, 'bad_param', `\`limit\` must be an integer from 1 to ${ MAX_LIMIT }`);
	}
	if (Number.isNaN(salaryFrom)) return error(400, 'bad_param', '`salaryFrom` must be an integer');
	if (remote !== null && remote !== 'true' && remote !== 'false') {
		return error(400, 'bad_param', '`remote` must be `true` or `false`');
	}
	if (sort !== 'date' && sort !== 'salary') return error(400, 'bad_param', '`sort` must be `date` or `salary`');

	let items = vacancies.filter((v) => {
		if (q && !`${ v.title } ${ v.companyName } ${ v.tags.join(' ') }`.toLowerCase().includes(q)) return false;
		if (city && v.city !== city) return false;
		if (remote !== null && v.remote !== (remote === 'true')) return false;
		if (tag && !v.tags.some((t) => t.toLowerCase() === tag)) return false;
		if (salaryFrom !== null && (v.salaryTo ?? v.salaryFrom ?? -1) < salaryFrom) return false;
		return true;
	});

	items = items.toSorted(sort === 'salary'
		? (a, b) => (b.salaryFrom ?? -1) - (a.salaryFrom ?? -1)
		: (a, b) => b.publishedAt.localeCompare(a.publishedAt));

	const total = items.length;
	const start = (page - 1) * limit;
	return json(200, {
		items: items.slice(start, start + limit).map(({ description, ...preview }) => preview),
		page,
		limit,
		total,
		totalPages: Math.max(1, Math.ceil(total / limit)),
	});
}

function getStats() {
	const day = 24 * 60 * 60 * 1000;
	const now = Date.now();
	const count = (key) => Object.entries(
		vacancies.flatMap((v) => (Array.isArray(v[key]) ? v[key] : [v[key]]))
			.reduce((acc, value) => ({ ...acc, [value]: (acc[value] ?? 0) + 1 }), {}),
	).map(([name, n]) => ({ name, count: n })).toSorted((a, b) => b.count - a.count).slice(0, 5);
	const withSalary = vacancies.filter((v) => v.salaryFrom !== null);

	return json(200, {
		totalVacancies: vacancies.length,
		remoteVacancies: vacancies.filter((v) => v.remote).length,
		newLast24h: vacancies.filter((v) => now - Date.parse(v.publishedAt) < day).length,
		avgSalaryFrom: Math.round(withSalary.reduce((sum, v) => sum + v.salaryFrom, 0) / withSalary.length),
		topCities: count('city'),
		topTags: count('tags'),
		generatedAt: new Date(now).toISOString(),
	});
}

function route(pathname) {
	const parts = pathname.replace(/^\/api/, '').split('/').filter(Boolean);
	if (parts.length === 1 && parts[0] === 'health') return { name: 'health' };
	if (parts.length === 1 && parts[0] === 'stats') return { name: 'stats' };
	if (parts.length === 1 && parts[0] === 'vacancies') return { name: 'vacancies' };
	if (parts.length === 2 && parts[0] === 'vacancies') return { name: 'vacancy', id: parts[1] };
	if (parts.length === 2 && parts[0] === 'companies') return { name: 'company', id: parts[1] };
	return null;
}

export async function handle(request) {
	const started = Date.now();
	const url = new URL(request.url);
	const params = url.searchParams;

	if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*' } });
	if (request.method !== 'GET') return error(405, 'method_not_allowed', 'Only GET is supported');

	const match = route(url.pathname);
	if (!match) return error(404, 'not_found', `No route for ${ url.pathname }`);

	const delayParam = parseIntParam(params.get('delay'), null);
	if (Number.isNaN(delayParam) || delayParam < 0 || delayParam > 30000) {
		return error(400, 'bad_param', '`delay` must be an integer from 0 to 30000');
	}
	const delay = delayParam ?? Math.round(DEFAULT_DELAY[match.name] * DELAY_SCALE);
	await sleep(delay);

	if (params.get('fail') === '1' || (match.name !== 'health' && Math.random() < FAIL_RATE)) {
		return error(500, 'simulated_failure', 'Simulated aggregator failure');
	}

	let response;
	switch (match.name) {
		case 'health':
			response = json(200, { ok: true });
			break;
		case 'stats':
			response = getStats();
			break;
		case 'vacancies':
			response = listVacancies(params);
			break;
		case 'vacancy': {
			const vacancy = vacancies.find((v) => v.id === match.id);
			response = vacancy ? json(200, vacancy) : error(404, 'not_found', `Vacancy ${ match.id } not found`);
			break;
		}
		case 'company': {
			const company = companies.find((c) => c.id === match.id);
			response = company ? json(200, company) : error(404, 'not_found', `Company ${ match.id } not found`);
			break;
		}
	}

	response.headers.set('server-timing', `aggregator;dur=${ Date.now() - started }`);
	return response;
}
