import type { TUserDTO } from "./user.dto";
import type { TUser } from "../model/user.model";

export const userMapper = {
	fromDtoToModel(dto: TUserDTO) {
		return {
			_id: dto._id,
			firstName: dto.first_name,
			lastName: dto.last_name,
			countryCode: dto.country_code,
			email: dto.email,
			whatsappNumber: dto.whatsapp_number,
			address: dto.address,
			isEmailVerified: dto.is_email_verified,
			status: dto.status,
			plan: dto.plan,
			logo: dto.logo,
			BusinessName: dto.business_name,
			businessDescription: dto.business_description,
			storeURL: dto.store_url,
			QRCode: dto.qr_code,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
			links: dto.links,
			step: dto.step,
		} satisfies TUser;
	},
};
