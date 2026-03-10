"use client";

import {
	// Building2,
	// BadgeCheck,
	// Bell,
	ChevronsUpDown,
	// CreditCard,
	LogOut,
	// User,
	// Sparkles,
} from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/components/ui/sidebar";
import { TUser } from "@/entities/user/model/user.model";
// import { UserRole } from "@/shared/types/types";
// import { UpdateBasicAgencyInfo } from "@/features/agency/components/dashboard/update-basic-agency-info/update-basic-agency-info";

export function NavUser({
	user,
	onLogout,
}: {
	user: TUser;
	onLogout: () => void;
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage className="object-cover" src={user.logo || ""} />
								<AvatarFallback className="rounded-lg">
									{user.firstName
										? user.firstName[0].toUpperCase() +
										  user.firstName[user.firstName.length - 1].toUpperCase()
										: null}
									{/* {user.firstName
										? user.firstName[0].toUpperCase() +
										  user.firstName[user.firstName.length - 1].toUpperCase()
										: null} */}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{user.firstName} {user.lastName}
								</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarFallback className="rounded-lg">
										{user.firstName
											? user.firstName[0].toUpperCase() +
											  user.firstName[user.firstName.length - 1].toUpperCase()
											: null}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user.firstName} {user.lastName}
									</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						{/* <DropdownMenuSeparator /> */}
						<DropdownMenuGroup>
							{/* <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem> */}
						</DropdownMenuGroup>
						{/* <DropdownMenuGroup>
              {user.userRole === UserRole.AGENCY && (
                <UpdateBasicAgencyInfo
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Building2 />
                      Update Agency Profile
                    </DropdownMenuItem>
                  }
                />
              )} */}
						{/* <UpdateBasicInfoDialog
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <User />
                    Update Profile
                  </DropdownMenuItem>
                }
              /> */}

						{/* <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem> */}
						{/* <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem> */}
						{/* <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
						{/* </DropdownMenuGroup> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
