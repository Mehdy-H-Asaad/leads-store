import type { TCustomerDTO } from "./customer.dto";
import type { TCustomer } from "../model/customer.model";

export const customerMapper = {
	fromDtoToModel(dto: TCustomerDTO): TCustomer {
		return {
			id: dto.id,
			name: dto.name,
			countryCode: dto.country_code,
			phone: dto.phone,
			email: dto.email,
			address: dto.address,
			notes: dto.notes,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		};
	},
};
