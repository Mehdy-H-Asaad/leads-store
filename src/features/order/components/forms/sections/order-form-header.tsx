import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui/sheet";

type TOrderFormHeaderProps = {
	isEditMode: boolean;
};

export const OrderFormHeader = ({ isEditMode }: TOrderFormHeaderProps) => {
	return (
		<SheetHeader className="border-b px-6 py-4">
			<SheetTitle>
				{isEditMode ? "Edit Order" : "Create New Order"}
			</SheetTitle>
			<SheetDescription>
				{isEditMode
					? "Update the details of this order"
					: "Add a new order to your store"}
			</SheetDescription>
		</SheetHeader>
	);
};
