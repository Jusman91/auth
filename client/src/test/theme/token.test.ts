import { theme } from 'antd';
import { themeToken } from '@/theme';
const { darkAlgorithm, defaultAlgorithm } = theme;
describe('Theme - Token', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return the correct dark theme', () => {
		const myTheme = 'dark';
		const { rootTheme, authTheme } = themeToken(myTheme);

		const expectedRootTheme = {
			token: {
				colorBgBase: '#0B1215',
				colorPrimary: '#2548a8',
				colorInfo: '#2548a8',
				colorSuccess: '#3f9a7a',
				colorError: '#f1595c',
				colorWarning: '#fa916b',
				colorTextBase: '#0f172a',
				colorBgLayout: '#f8fafc',
			},
			algorithm: darkAlgorithm,
		};

		const expectedAuthTheme = {
			token: {
				colorBgBase: '#030014',
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
					colorTextDisabled: '#2548a8',
				},
				Modal: {
					colorIcon: '#fff',
					colorIconHover: '#2548a8',
					borderRadiusLG: 16,
				},
			},
			algorithm: darkAlgorithm,
		};

		expect(rootTheme).toEqual(expectedRootTheme);
		expect(authTheme).toEqual(expectedAuthTheme);
	});

	it('should return the correct light theme', () => {
		const myTheme = 'light';
		const { rootTheme, authTheme } = themeToken(myTheme);

		const expectedRootTheme = {
			token: {
				colorBgBase: undefined,
				colorPrimary: '#2548a8',
				colorInfo: '#2548a8',
				colorSuccess: '#3f9a7a',
				colorError: '#f1595c',
				colorWarning: '#fa916b',
				colorTextBase: '#0f172a',
				colorBgLayout: '#f8fafc',
			},
			algorithm: defaultAlgorithm,
		};

		const expectedAuthTheme = {
			token: {
				colorBgBase: undefined,
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
					colorTextDisabled: undefined,
				},
				Modal: {
					colorIcon: '#2548a8',
					colorIconHover: '#fff',
					borderRadiusLG: 16,
				},
			},
			algorithm: defaultAlgorithm,
		};

		expect(rootTheme).toEqual(expectedRootTheme);
		expect(authTheme).toEqual(expectedAuthTheme);
	});
});
