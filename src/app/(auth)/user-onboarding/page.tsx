import { OnboardingForm } from "@/features/user/components/onboarding/onboarding-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get("refresh_token")?.value;

	const signUpCompleteToken = cookieStore.get("sign_up_complete_token")?.value;
	if (!signUpCompleteToken && !refreshToken) {
		redirect("/login");
	}

	if (!signUpCompleteToken && refreshToken) {
		redirect("/dashboard/overview");
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<header className="border-b px-6 py-4">
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 rounded-md bg-main-green flex items-center justify-center">
						<span className="text-white text-xs font-bold">R</span>
					</div>
					<span className="font-semibold text-sm">ReelVee</span>
				</div>
			</header>

			<main className="flex-1 flex items-start justify-center py-12 px-6">
				<div className="w-full max-w-2xl">
					<div className="mb-8">
						<h1 className="text-2xl font-bold tracking-tight">
							Welcome! Let&apos;s set up your account
						</h1>
						<p className="text-muted-foreground mt-2">
							Complete your profile in just two steps to unlock your store.
						</p>
					</div>

					<OnboardingForm />
				</div>
			</main>
		</div>
	);
}
