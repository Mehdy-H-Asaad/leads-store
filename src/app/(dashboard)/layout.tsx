import { DashboardSidebar } from "@/shared/components/layout/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import React from "react";
import { DashboardHeader } from "@/shared/components/layout/dashboard/dashboard-header";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset className="w-[calc(100%-16rem)]">
				<DashboardHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pb-10 px-12">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default layout;
