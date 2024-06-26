import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

export const themeToken = (myTheme: string) => {
	const darkTheme = myTheme === 'dark';
	const rootTheme: ThemeConfig = {
		token: {
			colorBgBase:
				myTheme === 'dark' ? '#0B1215' : undefined,
			colorPrimary: '#2548a8',
			colorInfo: '#2548a8',
			colorSuccess: '#3f9a7a',
			colorError: '#f1595c',
			colorWarning: '#fa916b',
			colorTextBase: '#0f172a',
			colorBgLayout: '#f8fafc',
		},
		algorithm:
			myTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
	};

	const authTheme: ThemeConfig = {
		token: {
			colorBgBase:
				myTheme === 'dark' ? '#030014' : undefined,
			colorPrimary: '#2548a8',
			colorInfo: '#2548a8',
			colorSuccess: '#3f9a7a',
			colorError: '#f1595c',
			colorWarning: '#fa916b',
			colorTextBase: '#0f172a',
			colorBgLayout: '#f8fafc',
		},
		components: {
			Input: {
				colorBgContainer: '#f8fafc',
			},
			Button: {
				colorTextDisabled: darkTheme
					? '#2548a8'
					: undefined,
			},
			Modal: {
				colorIcon: darkTheme ? '#fff' : '#2548a8',
				colorIconHover: darkTheme ? '#2548a8' : '#fff',
				borderRadiusLG: 16,
			},
		},
		algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
	};

	return { rootTheme, authTheme };
};
