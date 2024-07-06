import {
	mockGetFieldsAuthFormData,
	mockGetHeaderAuthFormData,
	mockGetInitialValues,
	mockGetSwitchAuthFormData,
	mockGetTxtBtnSubmitAuthForm,
	mockUseFormContext,
	mockUseScrollToTop,
	mockUseThemeContext,
} from '@/test/mocks';
import { render, screen } from '@/test/unit-testing';
import AuthForm from '.';

vi.mock('@/hooks', () => ({
	useThemeContext: mockUseThemeContext,
	useFormContext: mockUseFormContext,
	useScrollToTop: mockUseScrollToTop,
}));
vi.mock('@/lib/utils/auth', () => ({
	getInitialValues: mockGetInitialValues,
	getHeaderAuthFormData: mockGetHeaderAuthFormData,
	getSwitchAuthFormData: mockGetSwitchAuthFormData,
	getFieldsAuthFormData: mockGetFieldsAuthFormData,
	getTxtBtnSubmitAuthForm: mockGetTxtBtnSubmitAuthForm,
}));

describe('Auth Form', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render form without errors', () => {
		render(<AuthForm loading={false} name='register' />);
	});

	it('should render form correctly', () => {
		render(<AuthForm loading={false} name='register' />);

		const textLogoEl = screen.getByRole('heading', {
			name: /mediscover/i,
		});

		const imgLogoEl = screen.getByRole('img', {
			name: /logo/i,
		});

		const elements = [textLogoEl, imgLogoEl];
		const mockFunctions = [
			mockGetHeaderAuthFormData,
			mockGetInitialValues,
			mockGetFieldsAuthFormData,
			mockGetSwitchAuthFormData,
			mockGetTxtBtnSubmitAuthForm,
		];

		mockFunctions.forEach((mockFn) => {
			expect(mockFn).toHaveBeenCalled();
		});

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
