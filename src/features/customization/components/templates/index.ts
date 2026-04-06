import { ComponentType } from "react";
import { TEMPLATE_ID } from "@/shared/contracts/customization/customization.contract";
import { TemplateA } from "./template-a";
import { TTemplateProps } from "../../types/customization.types";

export const TEMPLATES: Record<string, ComponentType<TTemplateProps>> = {
	[TEMPLATE_ID.TEMPLATE_A]: TemplateA,
};
