"use client";

import { TOrderCustomerRefModel } from "@/entities/order/model/order.model";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { COUNTRY_CODES } from "@/shared/constants/constants";
import { formatDate } from "date-fns";
import { Phone, Mail, Calendar, Globe } from "lucide-react";
import { InfoRow } from "../info-row";

type Props = {
	customer: TOrderCustomerRefModel | null | undefined;
};

export const OrderCustomerCell = ({ customer }: Props) => {
	if (!customer) {
		return <span className="text-muted-foreground text-xs">—</span>;
	}

	const countryName =
		COUNTRY_CODES.find(c => c.code === customer.countryCode)?.name ?? null;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="group cursor-pointer flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors bg-muted hover:bg-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold">
						{customer.name.charAt(0).toUpperCase()}
					</span>
					<span className="max-w-[120px] truncate text-sm font-medium group-hover:text-primary">
						{customer.name}
					</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						<span className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-base font-bold">
							{customer.name.charAt(0).toUpperCase()}
						</span>
						<div>
							<p className="text-base font-semibold">{customer.name}</p>
							<p className="text-xs font-normal text-muted-foreground">
								Customer Details
							</p>
						</div>
					</DialogTitle>
				</DialogHeader>

				<div className="divide-y rounded-lg border px-2">
					<InfoRow
						icon={Phone}
						label="Phone"
						value={
							customer.phone ? (
								<span>
									{customer.countryCode} {customer.phone}
								</span>
							) : null
						}
					/>
					<InfoRow icon={Mail} label="Email" value={customer.email} />
					<InfoRow
						icon={Globe}
						label="Country"
						value={
							countryName
								? `${countryName} (${customer.countryCode})`
								: customer.countryCode
						}
					/>

					<InfoRow
						icon={Calendar}
						label="Member Since"
						value={formatDate(new Date(customer.createdAt), "dd MMM yyyy")}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
