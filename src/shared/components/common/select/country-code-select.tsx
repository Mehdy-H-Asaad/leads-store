"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { COUNTRY_CODES } from "@/shared/constants/constants";

type CountryCodeSelectProps = {
	value: string;
	onChange: (value: string) => void;
	invalid?: boolean;
};

export const CountryCodeSelect = ({
	value,
	onChange,
	invalid,
}: CountryCodeSelectProps) => {
	const [open, setOpen] = useState(false);

	const selected = COUNTRY_CODES.find(c => c.code === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					role="combobox"
					aria-invalid={invalid}
					aria-expanded={open}
					className={cn(
						"w-full justify-between font-normal h-9 px-3",
						!value && "text-muted-foreground",
						invalid && "border-destructive"
					)}
				>
					{selected ? (
						<span className="flex items-center gap-2 min-w-0">
							<span className="text-base leading-none">{selected.flag}</span>
							<span className="truncate">{selected.name}</span>
							<span className="text-muted-foreground shrink-0">
								({selected.code})
							</span>
						</span>
					) : (
						<span>Select country</span>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className="p-0"
				align="start"
				style={{ width: "var(--radix-popover-trigger-width)" }}
			>
				<Command>
					<CommandInput placeholder="Search country or code..." />
					<CommandList>
						<CommandEmpty>No country found.</CommandEmpty>
						<CommandGroup>
							{COUNTRY_CODES.map(country => (
								<CommandItem
									key={country.iso}
									value={`${country.name} ${country.code} ${country.iso}`}
									onSelect={() => {
										onChange(country.code);
										setOpen(false);
									}}
								>
									<span className="text-base leading-none mr-1">
										{country.flag}
									</span>
									<span className="flex-1 truncate">{country.name}</span>
									<span className="text-muted-foreground text-xs ml-2 shrink-0">
										{country.code}
									</span>
									<Check
										className={cn(
											"ml-2 h-4 w-4 shrink-0",
											value === country.iso ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
