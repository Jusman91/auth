export const mockUseThemeContext = vi.fn().mockReturnValue({
	myTheme: 'dark',
});

export const mockUseFormContext = vi.fn().mockReturnValue({
	name: 'register',
	submittable: true,
	// values: {
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// 	confirmPassword: '',
	// },
});

export const mockUseModal = vi.fn().mockReturnValue({
	isOpen: vi.fn(),
});

export const mockUseScrollToTop = vi.fn();
export const mockHandleRegister = vi.fn((args) => {
	console.log('handleRegister args:', args); // Log arguments passed to handleRegister
});
export const mockUseRegister = vi.fn(() => ({
	data: undefined,
	error: null,
	loading: false,
	isSuccess: false,
	handleRegister: mockHandleRegister,
}));

export const mockHandleLogin = vi.fn();
export const mockUseLogin = vi.fn().mockReturnValue({
	data: undefined,
	error: null,
	loading: false,
	isSuccess: false,
	handleLogin: mockHandleLogin,
});
