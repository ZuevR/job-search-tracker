import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site-header'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['cyrillic', 'latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
	title: {
		template: '%s | Job Tracker',
		default: 'Job Tracker',
	},
	description: 'Job Tracker помогает искать вакансии, отправлять отклики и отслеживать их статус в одном месте.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="ru"
			className={ `${ geistSans.variable } ${ geistMono.variable }` }
		>
			<body className="min-h-screen antialiased">
				<SiteHeader />
				{ children }
			</body>
		</html>
	);
}
