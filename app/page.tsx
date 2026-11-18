import type { Metadata } from 'next';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';


export const metadata: Metadata = {
	title: { absolute: 'Job Tracker — учёт откликов на вакансии' },
};

const features = [
	{
		title: "Воронка откликов",
		description: "Все отклики в одном месте — от резюме до оффера. Видно, где застрял.",
		icon: <Filter />
	},
	{
		title: "Вакансии из агрегатора",
		description: "Свежие вакансии с разных площадок собираются автоматически.",
		icon: <Briefcase />
	},
	{
		title: "Статусы и заметки",
		description: "Этап по каждой вакансии и заметки: с кем говорил и что дальше.",
		icon: <FileText />
	},
];

export default function LandingPage() {
	return (
		<div className="mx-auto max-w-7xl">
			<section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Поиск работы без хаоса и таблиц
				</h1>
				<p className="max-w-xl text-lg text-muted-foreground">
					Собирай вакансии из агрегаторов, отслеживай отклики и веди заметки в одном удобном кабинете.
				</p>
				<Link href="/dashboard" className={ buttonVariants({ variant: 'default', size: 'lg' }) }>
					Перейти в кабинет
				</Link>
			</section>

			<div
				className="grid grid-cols-1 gap-8 md:grid-cols-3 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6">
				{ features.map((feature) => (
					<Card key={feature.title}>
						<CardHeader>
							<CardTitle className="text-2xl font-semibold">
								{ feature.title }
							</CardTitle>
							<CardAction>
								{ feature.icon }
							</CardAction>
							<CardDescription>{ feature.description }</CardDescription>
						</CardHeader>
					</Card>
				)) }
			</div>
		</div>
	);
};
