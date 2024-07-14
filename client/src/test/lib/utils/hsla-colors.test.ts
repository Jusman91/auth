import { hslaColors } from '@/lib/utils';

describe('utils - hslaColors', () => {
	it('should generate colors with given hue and alpha', () => {
		const result = hslaColors('red', '0.5');
		expect(result).toEqual({
			'red-0': 'hsl(var(--color-red-0) / 0.5)',
			'red-10': 'hsl(var(--color-red-10) / 0.5)',
			'red-20': 'hsl(var(--color-red-20) / 0.5)',
			'red-30': 'hsl(var(--color-red-30) / 0.5)',
			'red-40': 'hsl(var(--color-red-40) / 0.5)',
			'red-50': 'hsl(var(--color-red-50) / 0.5)',
			'red-60': 'hsl(var(--color-red-60) / 0.5)',
			'red-70': 'hsl(var(--color-red-70) / 0.5)',
			'red-80': 'hsl(var(--color-red-80) / 0.5)',
			'red-90': 'hsl(var(--color-red-90) / 0.5)',
		});
	});

	it('should generate colors with default alpha value when alpha is not provided', () => {
		const result = hslaColors('blue', '');
		expect(result).toEqual({
			'blue-0': 'hsl(var(--color-blue-0) / <alpha-value>)',
			'blue-10':
				'hsl(var(--color-blue-10) / <alpha-value>)',
			'blue-20':
				'hsl(var(--color-blue-20) / <alpha-value>)',
			'blue-30':
				'hsl(var(--color-blue-30) / <alpha-value>)',
			'blue-40':
				'hsl(var(--color-blue-40) / <alpha-value>)',
			'blue-50':
				'hsl(var(--color-blue-50) / <alpha-value>)',
			'blue-60':
				'hsl(var(--color-blue-60) / <alpha-value>)',
			'blue-70':
				'hsl(var(--color-blue-70) / <alpha-value>)',
			'blue-80':
				'hsl(var(--color-blue-80) / <alpha-value>)',
			'blue-90':
				'hsl(var(--color-blue-90) / <alpha-value>)',
		});
	});
});
