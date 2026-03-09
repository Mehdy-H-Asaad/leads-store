import { useCallback, useEffect, useRef } from "react";

export type TUseDebounceOptions<T extends unknown[]> = {
	delay?: number;
	callback: (...args: T) => void;
};

export const useDebounce = <T extends unknown[]>({
	callback,
	delay = 500,
}: TUseDebounceOptions<T>) => {
	const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const debouncedCallback = useCallback(
		(...args: T) => {
			if (timeRef.current) {
				clearTimeout(timeRef.current);
			}
			timeRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		},
		[delay]
	);

	useEffect(() => {
		return () => {
			if (timeRef.current) {
				clearTimeout(timeRef.current);
			}
		};
	}, []);

	return debouncedCallback;
};
