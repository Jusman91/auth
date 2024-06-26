import { hslaColors } from './src/lib/utils';
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
				'clamp-h1':
					'clamp(34px, calc(2.8px + 3.2vw), 54px)',
				'clamp-h2': 'clamp(30px, calc(2.8px + 3vw), 46px)',
				'clamp-h3': 'clamp(28px, 2.6vw, 36px)',
				'clamp-h4': 'clamp(24px, 2.4vw, 32px)',
				'clamp-h5': 'clamp(20px, 2.2vw, 24px)',
				'clamp-h6': 'clamp(18px, 2vw, 20px)',
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
			boxShadow: {
				elements:
					'-5px -5px 15px rgba(164, 143, 255, 0.05), 5px 5px 15px rgba(0, 0, 0, 0.35)',
				'glass-inset':
					'inset 0 17px 5px -9px rgba(164, 143, 255, 0.05)',
				'glass-sm': '5px 5px 10px 0 rgba(21,31,71,1)',
			},
			backgroundColor: {
				glass: 'rgba(255,255,255,0.1)',
			},
			backgroundImage: {
				'background-auth':
					"url('/src/assets/img/bg/bg-galaxy-min.png')",
			},
			keyframes: {
				twinkle: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
			animation: {
				twinkle: 'twinkle 2s infinite',
			},
		},
	},
	plugins: [],
};
