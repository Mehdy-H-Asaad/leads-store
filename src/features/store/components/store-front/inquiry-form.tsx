"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
	Loader2,
	User,
	Phone,
	Mail,
	MapPin,
	MessageSquare,
	Hash,
	X,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/shared/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/shared/components/ui/drawer";
import { useSubmitStoreFrontOrder } from "../../hooks/useSubmitStoreFrontOrder";
import { getButtonStyle, isLightColor } from "../../lib/storefront.utils";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import type { TStoreConfig } from "@/entities/store/model/store.model";
import type { TStoreItem } from "@/entities/item/model/item.model";
import { ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import type { UseFormReturn } from "react-hook-form";
import type { TStoreFrontOrderFormValues } from "../../schema/store-front-order.schema";

type InquiryFormProps = {
	isOpen: boolean;
	onClose: () => void;
	item: TStoreItem;
	storeUrl: string;
	config: TStoreConfig;
};

type FormStyles = {
	inputStyle: React.CSSProperties;
	labelStyle: React.CSSProperties;
	subtleText: string;
	borderColor: string;
};

type InquiryFormBodyProps = {
	form: UseFormReturn<TStoreFrontOrderFormValues>;
	onSubmit: (data: TStoreFrontOrderFormValues) => void;
	isSubmitting: boolean;
	isProduct: boolean;
	btnStyle: React.CSSProperties;
	styles: FormStyles;
};

function InquiryFormBody({
	form,
	onSubmit,
	isSubmitting,
	isProduct,
	btnStyle,
	styles,
}: InquiryFormBodyProps) {
	const { inputStyle, labelStyle, subtleText, borderColor } = styles;

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-4 px-5 pb-6 pt-2 overflow-y-auto max-h-[65vh]"
		>
			{/* Name */}
			<Controller
				control={form.control}
				name="customer.name"
				render={({ field, fieldState }) => (
					<div>
						<label style={labelStyle}>
							<User size={11} />
							Full Name *
						</label>
						<input
							{...field}
							placeholder="Your full name"
							style={{
								...inputStyle,
								borderColor: fieldState.error ? "#dc2626" : borderColor,
							}}
						/>
						{fieldState.error && (
							<p className="text-xs mt-1" style={{ color: "#dc2626" }}>
								{fieldState.error.message}
							</p>
						)}
					</div>
				)}
			/>

			{/* Phone */}
			<div>
				<label style={labelStyle}>
					<Phone size={11} />
					Phone *
				</label>
				<div className="flex gap-2">
					<Controller
						control={form.control}
						name="customer.countryCode"
						render={({ field, fieldState }) => (
							<input
								{...field}
								placeholder="+971"
								style={{
									...inputStyle,
									width: "76px",
									flexShrink: 0,
									borderColor: fieldState.error ? "#dc2626" : borderColor,
								}}
							/>
						)}
					/>
					<Controller
						control={form.control}
						name="customer.phone"
						render={({ field, fieldState }) => (
							<input
								{...field}
								placeholder="50 123 4567"
								type="tel"
								style={{
									...inputStyle,
									flex: 1,
									borderColor: fieldState.error ? "#dc2626" : borderColor,
								}}
							/>
						)}
					/>
				</div>
				{(form.formState.errors.customer?.countryCode ||
					form.formState.errors.customer?.phone) && (
					<p className="text-xs mt-1" style={{ color: "#dc2626" }}>
						{form.formState.errors.customer?.countryCode?.message ||
							form.formState.errors.customer?.phone?.message}
					</p>
				)}
			</div>

			{/* Email */}
			<Controller
				control={form.control}
				name="customer.email"
				render={({ field }) => (
					<div>
						<label style={labelStyle}>
							<Mail size={11} />
							Email{" "}
							<span style={{ color: subtleText, fontWeight: 400 }}>
								(optional)
							</span>
						</label>
						<input
							{...field}
							value={field.value ?? ""}
							placeholder="you@example.com"
							type="email"
							style={inputStyle}
						/>
					</div>
				)}
			/>

			{/* Address */}
			<Controller
				control={form.control}
				name="customer.address"
				render={({ field }) => (
					<div>
						<label style={labelStyle}>
							<MapPin size={11} />
							Address{" "}
							<span style={{ color: subtleText, fontWeight: 400 }}>
								(optional)
							</span>
						</label>
						<input
							{...field}
							value={field.value ?? ""}
							placeholder="Delivery address"
							style={inputStyle}
						/>
					</div>
				)}
			/>

			{/* Quantity — products only */}
			{isProduct && (
				<Controller
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<div>
							<label style={labelStyle}>
								<Hash size={11} />
								Quantity{" "}
								<span style={{ color: subtleText, fontWeight: 400 }}>
									(optional)
								</span>
							</label>
							<input
								type="number"
								min={1}
								placeholder="1"
								value={field.value ?? ""}
								onChange={e =>
									field.onChange(
										e.target.value === "" ? undefined : Number(e.target.value)
									)
								}
								style={inputStyle}
							/>
						</div>
					)}
				/>
			)}

			{/* Message */}
			<Controller
				control={form.control}
				name="customerMessage"
				render={({ field }) => (
					<div>
						<label style={labelStyle}>
							<MessageSquare size={11} />
							Message{" "}
							<span style={{ color: subtleText, fontWeight: 400 }}>
								(optional)
							</span>
						</label>
						<textarea
							{...field}
							value={field.value ?? ""}
							placeholder="Any specific details or questions…"
							rows={3}
							style={{ ...inputStyle, resize: "none", lineHeight: "1.5" }}
						/>
					</div>
				)}
			/>

			{/* Submit */}
			<button
				type="submit"
				disabled={isSubmitting}
				style={{
					...btnStyle,
					padding: "13px",
					fontSize: "15px",
					fontWeight: 700,
					width: "100%",
					marginTop: "4px",
					opacity: isSubmitting ? 0.7 : 1,
					cursor: isSubmitting ? "not-allowed" : "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "8px",
				}}
			>
				{isSubmitting ? (
					<>
						<Loader2 size={16} className="animate-spin" />
						Sending…
					</>
				) : (
					"Send Inquiry"
				)}
			</button>
		</form>
	);
}

export function InquiryForm({
	isOpen,
	onClose,
	item,
	storeUrl,
	config,
}: InquiryFormProps) {
	const isMobile = useIsMobile();
	const { form, onSubmitStoreFrontOrder, isSubmittingOrder } =
		useSubmitStoreFrontOrder({ storeUrl, onSuccess: onClose });

	const theme = config.theme;
	const btnStyle = getButtonStyle(config);
	const isLight = isLightColor(theme.background);
	const subtleText = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)";
	const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)";
	const inputBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)";
	const isProduct = item.type === ITEM_TYPE.PRODUCT;

	const dialogBg =
		theme.backgroundType === "IMAGE"
			? isLight
				? "#ffffff"
				: "#1a1a1a"
			: theme.background;

	const styles: FormStyles = {
		inputStyle: {
			backgroundColor: inputBg,
			border: `1px solid ${borderColor}`,
			borderRadius: "10px",
			padding: "10px 12px",
			fontSize: "14px",
			width: "100%",
			color: theme.text,
			outline: "none",
		},
		labelStyle: {
			fontSize: "12px",
			fontWeight: 600,
			color: subtleText,
			display: "flex",
			alignItems: "center",
			gap: "5px",
			marginBottom: "5px",
		},
		subtleText,
		borderColor,
	};

	const sharedContainerStyle: React.CSSProperties = {
		backgroundColor: dialogBg,
		color: theme.text,
	};

	useEffect(() => {
		if (isOpen) form.setValue("itemId", item.id);
	}, [isOpen, item.id, form]);

	const formBody = (
		<InquiryFormBody
			form={form}
			onSubmit={onSubmitStoreFrontOrder}
			isSubmitting={isSubmittingOrder}
			isProduct={isProduct}
			btnStyle={btnStyle}
			styles={styles}
		/>
	);

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
				<DrawerContent
					className="border-0"
					style={sharedContainerStyle}
				>
					<DrawerHeader
						className="px-5 pt-4 pb-3 text-left"
						style={{ borderBottom: `1px solid ${borderColor}` }}
					>
						<DrawerTitle style={{ color: theme.text }}>
							Send Inquiry
						</DrawerTitle>
						<DrawerDescription style={{ color: subtleText }}>
							{item.name}
						</DrawerDescription>
					</DrawerHeader>
					{formBody}
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent
				showCloseButton={false}
				className="max-w-sm p-0 gap-0 border-0 overflow-hidden"
				style={sharedContainerStyle}
			>
				<DialogHeader
					className="px-5 pt-5 pb-4"
					style={{ borderBottom: `1px solid ${borderColor}` }}
				>
					<div className="flex items-start justify-between">
						<div>
							<DialogTitle
								className="text-base font-bold"
								style={{ color: theme.text }}
							>
								Send Inquiry
							</DialogTitle>
							<DialogDescription
								className="text-xs mt-0.5"
								style={{ color: subtleText }}
							>
								{item.name}
							</DialogDescription>
						</div>
						<button
							onClick={onClose}
							className="p-1.5 rounded-full -mt-1 -mr-1"
							style={{ backgroundColor: inputBg }}
						>
							<X size={15} style={{ color: subtleText }} />
						</button>
					</div>
				</DialogHeader>
				{formBody}
			</DialogContent>
		</Dialog>
	);
}
