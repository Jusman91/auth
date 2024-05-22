export interface TokenTheme {
	colorPrimary: string;
	colorInfo: string;
	colorSuccess: string;
	colorError: string;
	colorWarning: string;
	colorTextBase: string;
	colorBgLayout: string;
	fontSize: number;
}

export interface Themes {
	token: TokenTheme;
	algorithm: string;
}

export const themes: Themes = {
	token: {
		colorPrimary: '#2548a8',
		colorInfo: '#2548a8',
		colorSuccess: '#3f9a7a',
		colorError: '#f1595c',
		colorWarning: '#fa916b',
		colorTextBase: '#0f172a',
		colorBgLayout: '#f8fafc',
		fontSize: 16,
	},
	algorithm: 'Dark',
};
