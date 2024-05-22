import { hslaColors } from './src/theme/colors/color-hsla';
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			fontSize: {
				h1: [
					'clamp(34px, calc(2.8px + 3.2vw), 54px)',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h2: [
					'clamp(30px, calc(2.8px + 3vw), 46px)',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h3: [
					'clamp(28px, 2.6vw, 36px)',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h4: [
					'clamp(24px, 2.4vw, 32px)',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h5: [
					'clamp(20px, 2.2vw, 24px)',
					{
						lineHeight: '1.2',
						fontWeight: '600',
					},
				],
				h6: [
					'clamp(18px, 2vw, 20px)',
					{
						lineHeight: '1.75rem',
						fontWeight: '600',
					},
				],
			},
			colors: {
				'color-base':
					'hsl(var(--color-base) / <alpha-value>)',
				bkg: {
					base: 'hsl(var(--bg-base) / <alpha-value>)',
				},
				...hslaColors('primary'),
				...hslaColors('general'),
				...hslaColors('success'),
				...hslaColors('info'),
				...hslaColors('warning'),
				...hslaColors('danger'),
			},
		},
	},
	plugins: [],
};
