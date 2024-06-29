export const mockComparePassword = jest.fn();
export const mockEncrypPassword = jest.fn();
export const mockGenerateAccessToken = jest.fn();
export const mockGenerateForgotPasswordToken = jest.fn();
export const mockVerifyTokenResetPassword = jest.fn();
export const mockValidationBody = {
	auth: {
		login: jest.fn(),
		register: jest.fn(),
		forgotPassword: jest.fn(),
		resetPassword: jest.fn(),
	},
};
