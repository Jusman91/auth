import { useToggle } from '@/hooks';
import { renderHook, act } from '../unit-testing';

describe('useToggle', () => {
	it('should initialize with the default value', () => {
		const { result } = renderHook(() => useToggle(true));
		const [value] = result.current;

		expect(value).toBe(true);
	});

	it('should initialize with false if no default value is provided', () => {
		const { result } = renderHook(() => useToggle());
		const [value] = result.current;

		expect(value).toBe(false);
	});

	it('should toggle the value when toggleValue is called', () => {
		const { result } = renderHook(() => useToggle(false));
		const [, toggleValue] = result.current;

		act(() => {
			toggleValue();
		});

		const [valueAfterToggle] = result.current;
		expect(valueAfterToggle).toBe(true);

		act(() => {
			toggleValue();
		});

		const [valueAfterSecondToggle] = result.current;
		expect(valueAfterSecondToggle).toBe(false);
	});

	it('should set the value to the specified boolean value when toggleValue is called with a parameter', () => {
		const { result } = renderHook(() => useToggle(false));
		const [, toggleValue] = result.current;

		act(() => {
			toggleValue(true);
		});

		const [valueAfterToggle] = result.current;
		expect(valueAfterToggle).toBe(true);

		act(() => {
			toggleValue(false);
		});

		const [valueAfterSecondToggle] = result.current;
		expect(valueAfterSecondToggle).toBe(false);
	});
});
