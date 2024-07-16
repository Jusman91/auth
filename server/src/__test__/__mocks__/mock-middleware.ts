import { mockUser } from './mock-data';

export const mockVerifyToken = jest.fn((req, res, next) => {
	req.user = { id: mockUser.id };
	next();
});

export const mockVerifyUser = jest.fn((req, res, next) => {
	mockVerifyToken(req, res, () => {
		if (req.user?.id === req.params.id) {
			next();
		}
	});
});
export const mockVerifyTokenResetPassword = jest.fn();
