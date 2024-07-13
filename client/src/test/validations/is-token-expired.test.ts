import { isTokenExpired } from '@/validations';
import * as decoded from 'jwt-decode';
vi.mock('jwt-decode', async () => {
	const mod = await vi.importActual<
		typeof import('jwt-decode')
	>('jwt-decode');
	return {
		...mod,
		default: vi.fn(),
	};
});
describe('Validations - isTokenExpired', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return true if the token expired', () => {
		const expiredToken = 'expiredToken';
		const exp = Date.now() / 1000 - 10;
		const jwtDecodeSpy = vi
			.spyOn(decoded, 'jwtDecode')
			.mockReturnValue({ exp: exp });
		const result = isTokenExpired(expiredToken);

		expect(result).toBe(true);
		expect(jwtDecodeSpy).toHaveBeenCalledWith(expiredToken);
	});

	it('should return false if the token valid', () => {
		const validToken = 'validToken';
		const exp = Date.now() / 1000 + 3600;
		const jwtDecodeSpy = vi
			.spyOn(decoded, 'jwtDecode')
			.mockReturnValue({ exp: exp });
		const result = isTokenExpired(validToken);

		expect(result).toBe(false);
		expect(jwtDecodeSpy).toHaveBeenCalledWith(validToken);
	});

	it('should return true if the token invalid', () => {
		const invalidToken = 'invalidToken';
		const jwtDecodeSpy = vi
			.spyOn(decoded, 'jwtDecode')
			.mockImplementation(() => {
				throw new Error('Invalid token');
			});
		const result = isTokenExpired(invalidToken);

		expect(result).toBe(true);
		expect(jwtDecodeSpy).toHaveBeenCalledWith(invalidToken);
	});

	it('should return true if exp is not present', () => {
		const tokenWithoutExp = 'tokenWithoutExp';
		const jwtDecodeSpy = vi
			.spyOn(decoded, 'jwtDecode')
			.mockReturnValue({});
		const result = isTokenExpired(tokenWithoutExp);

		expect(result).toBe(true);
		expect(jwtDecodeSpy).toHaveBeenCalledWith(
			tokenWithoutExp,
		);
	});
});
