
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import { createClient } from "@/utils/supabase/server";
import ProfileComp from "@/components/ProfileComp";
import { Link } from "@nextui-org/link";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/react";


import { UsersRound } from 'lucide-react';

import Image from "next/image";

export async function Navbar() {

	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser()
	let role = null
	let { data: users, error } = await supabase.from('users').select('*').eq('user_id', user?.id)
	if (users) {

		role = users[0].role
	}




	/*
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);
*/




	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image src="/logo.png" alt="UpRent Logo" width={50} height={50} />
						<p className="font-bold text-inherit">UpRent</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<>
							{role && item.roles.includes(role) && (
								<NavbarItem key={item.href}>
									<NextLink
										className={clsx(
											linkStyles({ color: "foreground" }),
											"data-[active=true]:text-primary data-[active=true]:font-medium"
										)}
										color="foreground"
										href={item.href}
									>
										{item.label}
									</NextLink>
								</NavbarItem>
							)}

						</>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				{/*<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}
				<NavbarItem className="hidden md:flex">
					{user ? (
						<ProfileComp />
					) : (
						<Button
							as={Link}
							className="text-sm font-normal text-default-600 bg-default-100"
							href={'/login'}
							startContent={<UsersRound className="text-danger" />}
							variant="flat"
						>
							Login
						</Button>
					)}


				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">

				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{/*searchInput*/}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};