import type { VacancyPreview } from '@/lib/aggregator';

type SalaryFields = Partial<Pick<VacancyPreview, 'salaryFrom' | 'salaryTo'>>

const moneyFormat = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
	maximumFractionDigits: 0,
});

const numberFormat = new Intl.NumberFormat('ru-RU', {
	maximumFractionDigits: 0,
});

export function formatMoney(value: number): string {
	return moneyFormat.format(value);
}

function formatMoneyRange(from: number, to: number): string {
	if (from === to) {
		return formatMoney(from);
	}

	return `${numberFormat.format(from)} – ${formatMoney(to)}`;
}

export function formatSalaryRange({ salaryFrom, salaryTo }: SalaryFields): string {
	const hasFrom = salaryFrom != null;
	const hasTo = salaryTo != null;

	if (hasFrom && hasTo) {
		return formatMoneyRange(salaryFrom, salaryTo);
	}

	if (hasFrom) {
		return `от ${formatMoney(salaryFrom)}`;
	}

	if (hasTo) {
		return `до ${formatMoney(salaryTo)}`;
	}

	return '—';
}
