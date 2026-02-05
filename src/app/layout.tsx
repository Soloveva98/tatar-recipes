import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/provider';
import { siteConfig } from '@/config/site.config';
import Header from '@/components/UI/layout/Header';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import AppLoader from '@/hoc/app-loader';
import Title from '@/components/UI/layout/Title';

const inter = Jost({
	subsets: ['cyrillic', 'latin'],
	display: 'swap',
	variable: '--font-jost',
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="ru" className="light h-[100%]">
			<body className={`${inter.variable} min-h-[100%]`}>
				<Providers>
					<SessionProvider session={session}>
						<AppLoader>
							<Header />
							<Title />
							<main className="flex flex-col max-w-[1024px] mx-auto px-[24px] items-center justify-start grow">
								{children}
							</main>
							<footer className="flex justify-center items-center h-[80px]">
								<p>{siteConfig.description}</p>
							</footer>
						</AppLoader>
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
