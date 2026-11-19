// Deterministic fake dataset: same seed -> same companies and vacancies on every start.

function mulberry32(seed) {
	return function next() {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const rand = mulberry32(20261118);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const pickMany = (arr, min, max) => {
	const count = min + Math.floor(rand() * (max - min + 1));
	const copy = [...arr];
	const result = [];
	while (result.length < count && copy.length) {
		result.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
	}
	return result;
};
const pad = (n, width) => String(n).padStart(width, '0');

const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород'];
const SOURCES = ['jobboard', 'telegram', 'career-site', 'referral'];
const SIZES = ['1-50', '51-200', '201-1000', '1000+'];

const COMPANY_PREFIXES = ['Нова', 'Терра', 'Вектор', 'Квант', 'Пиксель', 'Север', 'Аврора', 'Орбита', 'Сигма', 'Лотос'];
const COMPANY_SUFFIXES = ['Тех', 'Софт', 'Лаб', 'Дата', 'Код'];
const COMPANY_FIELDS = ['финтех', 'e-commerce', 'логистика', 'edtech', 'медтех', 'геймдев', 'B2B SaaS', 'медиа'];

const ROLES = [
	{ title: 'Frontend-разработчик', tags: ['React', 'TypeScript', 'Next.js', 'CSS', 'Redux', 'Vite'] },
	{ title: 'React-разработчик', tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'React Query'] },
	{ title: 'Fullstack-разработчик', tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Next.js', 'Docker'] },
	{ title: 'Next.js-разработчик', tags: ['Next.js', 'React', 'TypeScript', 'SSR', 'Vercel'] },
	{ title: 'Node.js-разработчик', tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'] },
	{ title: 'Тимлид фронтенда', tags: ['React', 'TypeScript', 'Архитектура', 'Менторство', 'Next.js'] },
];
const LEVELS = [
	{ prefix: 'Junior', salary: [80, 140] },
	{ prefix: 'Middle', salary: [160, 260] },
	{ prefix: 'Senior', salary: [280, 420] },
	{ prefix: 'Lead', salary: [380, 550] },
];

export const companies = Array.from({ length: 20 }, (_, i) => {
	const name = `${ COMPANY_PREFIXES[i % COMPANY_PREFIXES.length] }${ COMPANY_SUFFIXES[Math.floor(i / 2) % COMPANY_SUFFIXES.length] }`;
	const field = pick(COMPANY_FIELDS);
	return {
		id: `c-${ pad(i + 1, 2) }`,
		name,
		city: pick(CITIES),
		size: pick(SIZES),
		field,
		rating: Math.round((3.2 + rand() * 1.7) * 10) / 10,
		website: `https://company-${ pad(i + 1, 2) }.example.com`,
		description: `${ name } — продуктовая компания в сфере «${ field }». Своя команда разработки, современный стек, удалёнка по договорённости.`,
	};
});

const HOUR = 60 * 60 * 1000;
// Anchor dates to server start so "new in the last 24h" stays meaningful.
const anchor = Date.now();

export const vacancies = Array.from({ length: 120 }, (_, i) => {
	const role = pick(ROLES);
	const level = pick(LEVELS);
	const company = pick(companies);
	const remote = rand() < 0.45;
	const hasSalary = rand() < 0.8;
	const from = level.salary[0] + Math.floor(rand() * 4) * 10;
	const to = hasSalary && rand() < 0.7 ? from + 40 + Math.floor(rand() * 6) * 10 : null;
	const tags = pickMany(role.tags, 2, 4);
	return {
		id: `v-${ pad(i + 1, 3) }`,
		title: `${ level.prefix } ${ role.title }`,
		companyId: company.id,
		companyName: company.name,
		city: remote && rand() < 0.5 ? company.city : pick(CITIES),
		remote,
		salaryFrom: hasSalary ? from * 1000 : null,
		salaryTo: to ? to * 1000 : null,
		currency: 'RUB',
		tags,
		source: pick(SOURCES),
		publishedAt: new Date(anchor - i * 5 * HOUR - Math.floor(rand() * HOUR)).toISOString(),
		description: `Ищем: ${ level.prefix } ${ role.title } в ${ company.name }. Стек: ${ tags.join(', ') }. ${ remote ? 'Можно удалённо.' : 'Работа в офисе или гибрид.' }`,
	};
});
