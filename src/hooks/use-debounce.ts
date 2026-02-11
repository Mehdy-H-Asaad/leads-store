import { useCallback, useRef } from "react";

export type TUseDebounceOptions<T> = {
	delay?: number;
	callback: (...args: T[]) => void;
};

export const useDebounce = <T>({
	callback,
	delay = 500,
}: TUseDebounceOptions<T>) => {
	const timeRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedCallback = useCallback(
		(...args: T[]) => {
			if (timeRef.current) {
				clearTimeout(timeRef.current);
			}
			timeRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	return debouncedCallback;
};
