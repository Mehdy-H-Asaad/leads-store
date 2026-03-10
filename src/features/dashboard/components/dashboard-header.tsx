"use client";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/user/model/user.store";
import { usePathname } from "next/navigation";
import { Calendar, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
//
export const DashboardHeader = () => {
	const { user } = useUserStore();
	const pathname = usePathname();
	const [greeting, setGreeting] = useState("");
	const [motivationalText, setMotivationalText] = useState("");
	const [currentDate, setCurrentDate] = useState("");

	// Get greeting based on time of day (only once)
	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) {
			setGreeting("Good Morning");
			setMotivationalText("Start your day strong!");
		} else if (hour < 18) {
			setGreeting("Good Afternoon");
			setMotivationalText("Keep up the great work!");
		} else {
			setGreeting("Good Evening");
			setMotivationalText("Finish strong today!");
		}

		// Set current date
		const now = new Date();
		setCurrentDate(
			now.toLocaleDateString("en-US", {
				weekday: "long",
				month: "short",
				day: "numeric",
			})
		);
	}, []);

	// Get page title from pathname
	const getPageTitle = () => {
		const segments = pathname.split("/").filter(Boolean);
		if (segments.length === 0) return "Dashboard";
		const lastSegment = segments[segments.length - 1];
		return lastSegment
			.split("-")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<header className="flex h-auto min-h-16 shrink-0 items-center gap-2 transition-all ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mb-6 bg-linear-to-r from-background via-background to-muted/20 hover:to-muted/30 duration-300">
			<div className="flex items-center justify-between gap-4 px-4 w-full py-3">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1 hover:bg-primary/10 transition-colors hover:scale-105 duration-200" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
					</div>
					<div className="flex flex-col gap-1 animate-in fade-in slide-in-from-left-4 duration-500">
						<div className="flex items-center gap-2">
							<h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
								{greeting}
								{user && (
									<span className="text-primary font-bold">
										{user.firstName}
									</span>
								)}
							</h1>
						</div>
						<p className="text-xs text-muted-foreground flex items-center gap-2">
							<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
								<Calendar className="h-3 w-3" />
								{currentDate}
							</span>
							<span className="hidden sm:inline">•</span>
							<span className="hidden sm:inline font-medium">
								{getPageTitle()}
							</span>
							<span className="hidden md:inline">•</span>
							<span className="hidden md:inline text-muted-foreground/80 italic">
								{motivationalText}
							</span>
						</p>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="hidden lg:flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
					<Button
						variant="ghost"
						size="sm"
						className="gap-2 hover:bg-primary/10 transition-all hover:scale-105"
					>
						<Menu className="h-4 w-4" />
						<span className="text-xs font-medium">Quick Actions</span>
					</Button>
				</div>
			</div>
		</header>
	);
};
