import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				Roboto: `"Roboto", sans-serif`,
			},
			screens: {
				'dt-exl': { min: '1660px' },
				'dt-l-min': { min: '1366px' },
				'dt-xl': { max: '1660px' },
				'dt-l': { max: '1440px' },
				'dt-sm': { max: '1366px' },
				'tl-l': { max: '1280px' },
				'tl-p': { max: '1000px' },
				mb: { max: '767px' },
			},
			colors: {
				primary2: '#FFEAD5',
				primary6: '#F96619',
				success1: '#ECFDF3',
				success6: '#12B76A',
				warning2: '#FFF4C5',
				warning6: '#FDA712',
				gray2: '#EDEEF1',
				gray3: '#D7DAE0',
				gray4: '#B3B9C6',
				gray5: '#8A94A6',
				gray6: '#667085',
				gray7: '#565E73',
				gray8: '#1D2939',
				gray9: '#3D424F',
				gray10: '#363A44',
				red: '#ff0000',
			},
			animation: {
				'spin-slow': 'spin 10s linear infinite',
			},
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
export default config;
