'use client';

import { siteConfig } from '@/config/site.config';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginModal from '../modals/LoginModal';
import RegistrationModal from '../modals/RegistrationModal';
import { useState } from 'react';
import { signOutFunc } from '@/actions/sign-out';
import { useAuthStore } from '@/store/auth.store';

export const Logo = () => {
	return (
		<Image
			src="/logo_tatar_kitchen.png"
			width={26}
			height={26}
			alt="logo"
			priority
		/>
	);
};

export default function Header() {
	const pathname = usePathname();
	const [isOpenLogin, setIsOpenLogin] = useState(false);
	const [isOpenRegistration, setIsOpenRegistration] = useState(false);
	const { isAuth, status, session, setAuthState } = useAuthStore();

	const getNavItems = () => {
		return siteConfig.navItems
			.filter((item) => {
				if (item.href === '/ingredients') {
					return isAuth;
				}
				return true;
			})
			.map(({ href, label }) => {
				const isActive = pathname === href;
				return (
					<NavbarItem key={href}>
						<Link
							href={href}
							className={`px-3 py-1
									border border-transparent rounded-md
									hover:text-blue-300
									hover:border-blue-300
									transition-colors
									transition-border
									duration-200
									${isActive ? 'text-blue-500' : 'text-foreground'}`}
						>
							{label}
						</Link>
					</NavbarItem>
				);
			});
	};

	const handleSignOut = async () => {
		try {
			await signOutFunc();
			setAuthState('unauthenticated', null);
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<Navbar className="navbar-site">
			<NavbarBrand>
				<Link href="/" className="flex gap-1 items-center">
					<Logo />
					<p className="font-bold text-inherit">{siteConfig.title}</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className="sm:flex gap-4" justify="center">
				{getNavItems()}
			</NavbarContent>

			{status === 'loading' ? (
				<p>Loading...</p>
			) : (
				<NavbarContent justify="end">
					{isAuth && <p>Привет, {session?.user?.email}</p>}
					{!isAuth ? (
						<>
							<NavbarItem>
								<Button
									as={Link}
									color="secondary"
									href="#"
									variant="flat"
									onPress={() => setIsOpenLogin(true)}
								>
									Войти
								</Button>
							</NavbarItem>
							<NavbarItem>
								<Button
									as={Link}
									color="primary"
									href="#"
									variant="flat"
									onPress={() => setIsOpenRegistration(true)}
								>
									Регистрация
								</Button>
							</NavbarItem>
						</>
					) : (
						<NavbarItem>
							<Button
								as={Link}
								color="secondary"
								href="#"
								variant="flat"
								onPress={handleSignOut}
							>
								Выйти
							</Button>
						</NavbarItem>
					)}
				</NavbarContent>
			)}

			<LoginModal
				isOpen={isOpenLogin}
				onClose={() => setIsOpenLogin(false)}
			/>

			<RegistrationModal
				isOpen={isOpenRegistration}
				onClose={() => setIsOpenRegistration(false)}
			/>
		</Navbar>
	);
}
