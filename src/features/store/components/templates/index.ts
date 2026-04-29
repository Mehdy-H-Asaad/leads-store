import { ComponentType } from "react";
import { TEMPLATE_ID } from "@/shared/contracts/store/store.contract";
import { TemplateA } from "./template-a/template-a";
import { TTemplateProps } from "../../types/store.types";

export const TEMPLATES: Record<string, ComponentType<TTemplateProps>> = {
	[TEMPLATE_ID.TEMPLATE_A]: TemplateA,
};
