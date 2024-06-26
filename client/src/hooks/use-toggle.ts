import { useCallback, useState } from 'react';

export default function useToggle(
	defaultValue?: boolean,
): [boolean, (value?: boolean) => void] {
	const [value, setValue] = useState<boolean>(
		!!defaultValue,
	);

	const toggleValue = useCallback((value?: boolean) => {
		setValue((currentValue) =>
			typeof value === 'boolean' ? value : !currentValue,
		);
	}, []);

	return [value, toggleValue] as const;
}
