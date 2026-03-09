import { SignupForm } from "@/features/auth/components/signup-form";
import { userService } from "@/entities/user/api/user.service";
import { redirect } from "next/navigation";

const SignupPage = async () => {
	const user = await userService.getMe();
	if (user.data) {
		return redirect("/");
	}
	return <SignupForm />;
};

export default SignupPage;
