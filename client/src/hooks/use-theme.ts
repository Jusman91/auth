import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { useThemeContext } from './use-context';

export function useTheme() {
	const { myTheme } = useThemeContext();
	const { darkAlgorithm, defaultAlgorithm } = theme;
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

		components: {
			// Menu: {
			// 	itemSelectedBg: '#D2EEF4',
			// },
			// Table: {
			// 	fontSize: 12,
			// },
			Input: {
				colorBorder: 'rgb(100, 116, 139)',
				inputFontSizeLG: 14,
				controlHeightLG: 52,
				borderRadiusLG: 10,
			},
			Modal: {
				borderRadiusLG: 16,
				paddingContentHorizontalLG: 0,
				colorBgMask: 'rgba(0, 0, 0, 0.1)',
			},
		},
		algorithm:
			myTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
	};

	const authTheme: ThemeConfig = {
		token: {
			colorBgBase: '#192930',
			colorError: '#f52629',
			fontSize: 14,
			borderRadius: 12,
			colorPrimary: '#094a58',
		},
		components: {
			Input: {
				colorBgContainer: '#fff',
				colorTextPlaceholder: '#6b6b6b',
			},
			Form: {
				labelColor: '#fff',
			},
			Notification: {
				colorText: '#fff',
				colorTextHeading: '#fff',
				colorIcon: '#fff',
				colorIconHover: '#ff0000',
			},
		},
	};

	return { rootTheme, authTheme };
}
