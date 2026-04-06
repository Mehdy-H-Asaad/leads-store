"use client";

import * as React from "react";
import {
	LayoutDashboardIcon,
	Box,
	ChartBar,
	Settings,
	Megaphone,
	Tag,
	Users,
	Paintbrush,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/shared/components/ui/sidebar";
// import { useUserStore } from "@/entities/user/model/user.store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { TUser } from "@/entities/user/model/user.model";
import { useGetMe } from "@/entities/user/api/user.query";

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
	user: TUser;
};

export function DashboardSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	// const { user } = useUserStore();
	const { user } = useGetMe({ enabled: true });
	const { onLogout } = useLogout();
	const sidebarData: TSidebarData = {
		user: user ?? ({} as TUser),

		items: [
			{
				title: "Dashboard",
				url: "/",
				icon: <LayoutDashboardIcon className="size-5" />,
				isActive: false,
			},
			{
				title: "Items",
				url: "/items",
				icon: <Box className="size-5" />,
				isActive: false,
			},

			{
				title: "Customers",
				url: "/customers",
				icon: <Users className="size-5" />,
				isActive: false,
			},
			{
				title: "Categories",
				url: "/categories",
				icon: <Tag className="size-5" />,
				isActive: false,
			},
			{
				title: "Customization",
				url: "/customization",
				icon: <Paintbrush className="size-5" />,
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
				<h1 className="text-2xl font-bold w-fit "> ReelVee</h1>
				{/* <Logo /> */}
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sidebarData.items} user={sidebarData.user} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user ?? ({} as TUser)} onLogout={onLogout} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
