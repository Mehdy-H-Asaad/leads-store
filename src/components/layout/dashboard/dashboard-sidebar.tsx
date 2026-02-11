"use client";

import * as React from "react";
import {
	Building2,
	LayoutDashboardIcon,
	Briefcase,
	Box,
	User,
	ChartBar,
	Settings,
	Mail,
	Megaphone,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { TUserDTO } from "@/features/user/schema/user.schema";
import { useUserStore } from "@/features/user/store/user.store";
import { useLogout } from "@/features/auth/hooks/use-logout";

type TSidebarData = {
	items: {
		title: string;
		url: string;
		icon?: React.ReactNode;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			icon?: React.ReactNode;
		}[];
	}[];
	user: TUserDTO;
};

export function DashboardSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUserStore();
	const { onLogout } = useLogout();
	const sidebarData: TSidebarData = {
		user: user ?? ({} as TUserDTO),

		items: [
			{
				title: "Dashboard",
				url: "/",
				icon: <LayoutDashboardIcon className="size-5" />,
				isActive: false,
			},
			{
				title: "Products",
				url: "/products",
				icon: <Box className="size-5" />,
				isActive: false,
			},
			{
				title: "Leads",
				url: "/leads",
				icon: <User className="size-5" />,
				isActive: false,
			},
			{
				title: "Marketing",
				url: "/marketing",
				icon: <Megaphone className="size-5" />,
				isActive: false,
			},
			{
				title: "Analytics",
				url: "/analytics",
				icon: <ChartBar className="size-5" />,
				isActive: false,
			},
			{
				title: "Settings",
				url: "/settings",
				icon: <Settings className="size-5" />,
				isActive: false,
			},
		],
	};
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="px-4 pt-6 mb-4">
				<h1 className="text-lg font-bold w-fit ">⚡ StoreLink</h1>
				{/* <Logo /> */}
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sidebarData.items} user={sidebarData.user} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user ?? ({} as TUserDTO)} onLogout={onLogout} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
