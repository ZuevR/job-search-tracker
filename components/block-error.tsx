import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type BlockErrorProps = {
	title: string;
};

// TODO: задача 5 — фолбэк для error boundary вокруг каждого блока /dashboard. Пока не используется.
export function BlockError({ title }: BlockErrorProps) {
	return (
		<Card className="border-destructive/40">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-destructive">
					Не удалось загрузить данные
				</p>
			</CardContent>
		</Card>
	);
}