export const mockComparePassword = jest.fn();
export const mockEncrypPassword = jest
	.fn()
	.mockResolvedValue({
		hashedPassword: 'hashedPassword',
	});
export const mockGenerateAccessToken = jest.fn();
export const mockGenerateForgotPasswordToken = jest.fn();
export const mockValidationBody = {
	auth: {
		login: jest.fn(),
		register: jest.fn(),
		forgotPassword: jest.fn(),
		resetPassword: jest.fn(),
	},
};
