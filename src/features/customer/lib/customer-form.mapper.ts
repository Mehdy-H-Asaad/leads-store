import type {
	TCreateCustomerDTO,
	TUpdateCustomerDTO,
} from "@/entities/customer/api/customer.dto";
import type { TCustomer } from "@/entities/customer/model/customer.model";
import type {
	TCustomerFormValues,
	TCreateCustomerFormValues,
	TUpdateCustomerFormValues,
} from "../schema/customer-form.schema";

export const customerFormMapper = {
	fromModelToFormValues(customer: TCustomer): TCustomerFormValues {
		return {
			name: customer.name,
			country_code: customer.countryCode ?? "",
			phone: customer.phone ?? "",
			email: customer.email ?? "",
			address: customer.address ?? "",
			notes: customer.notes ?? "",
		};
	},

	toCreateDTO({
		name,
		country_code,
		phone,
		email,
		address,
		notes,
	}: TCreateCustomerFormValues): TCreateCustomerDTO {
		return {
			name,
			country_code: country_code,
			phone: phone,
			email: email || undefined,
			address: address || undefined,
			notes: notes || undefined,
		};
	},

	toUpdateDTO({
		name,
		country_code,
		phone,
		email,
		address,
		notes,
	}: TUpdateCustomerFormValues): TUpdateCustomerDTO {
		return {
			name,
			country_code: country_code,
			phone: phone,
			email: email || undefined,
			address: address || undefined,
			notes: notes || undefined,
		};
	},
};
