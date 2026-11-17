import type { Metadata } from 'next';
import { Source_Sans_3, Oxanium } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site-header'
import { cn } from "@/lib/utils";

const oxaniumHeading = Oxanium({ subsets: ['latin'], variable: '--font-heading' });

const sourceSans3 = Source_Sans_3({subsets:['cyrillic', 'latin'],variable:'--font-sans'});

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
			className={cn("font-sans", sourceSans3.variable, oxaniumHeading.variable)}
		>
			<body className="min-h-screen antialiased">
				<SiteHeader />
				{ children }
			</body>
		</html>
	);
}
