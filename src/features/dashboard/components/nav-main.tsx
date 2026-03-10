"use client";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
// import { UserRole } from "@/shared/types/types";
// import { useAuthUserStore } from "@/features/auth/store/auth.store";
import { TUser } from "@/entities/user/model/user.model";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: React.ReactNode;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
	user: TUser;
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup className="px-4">
			<SidebarMenu className="gap-4">
				{items.map(item => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							asChild
							isActive={pathname === item.url}
							tooltip={item.title}
							className={cn(
								"cursor-pointer transition-all duration-200 text-sm h-10",
								"hover:bg-black hover:text-white",
								"data-[active=true]:bg-black data-[active=true]:text-white"
							)}
						>
							<Link
								className="flex w-full items-center gap-2 py-2.5 px-4"
								href={item.url}
							>
								{item.icon}
								{item.title}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
