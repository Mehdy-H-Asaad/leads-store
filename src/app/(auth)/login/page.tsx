import { LoginForm } from "@/features/auth/components/login-form";
import { userService } from "@/entities/user/api/user.service";
import { redirect } from "next/navigation";

const page = async () => {
	try {
		const user = await userService.getMe();
		if (user && user.data) {
			return redirect("/");
		}
	} catch {}
	return <LoginForm />;
};

export default page;
