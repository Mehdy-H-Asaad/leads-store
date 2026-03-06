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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { TUserDTO } from "@/entities/user/api/user.dto";
// import { UserRole } from "@/shared/types/types";
// import { UpdateBasicAgencyInfo } from "@/features/agency/components/dashboard/update-basic-agency-info/update-basic-agency-info";

export function NavUser({
	user,
	onLogout,
}: {
	user: TUserDTO;
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
									MA
									{/* {user.firstName
										? user.firstName[0].toUpperCase() +
										  user.firstName[user.firstName.length - 1].toUpperCase()
										: null} */}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">Admin Admin</span>
								<span className="truncate text-xs">admin@admin.com</span>
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
