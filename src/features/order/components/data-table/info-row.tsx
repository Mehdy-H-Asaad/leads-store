export const InfoRow = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: React.ReactNode;
}) => (
	<div className="flex items-start gap-3 py-2.5 px-1">
		<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
			<Icon className="h-3.5 w-3.5 text-muted-foreground" />
		</div>
		<div className="min-w-0 flex-1">
			<p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<p className="mt-0.5 text-sm font-medium text-foreground">
				{value ?? <span className="text-muted-foreground">—</span>}
			</p>
		</div>
	</div>
);
