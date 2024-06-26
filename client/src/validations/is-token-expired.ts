import { jwtDecode, JwtPayload } from 'jwt-decode';
export function isTokenExpired(token: string): boolean {
	try {
		const decoded: JwtPayload =
			jwtDecode<JwtPayload>(token);
		const currentTime = Date.now() / 1000;
		const exp = decoded.exp ?? 0;
		return exp < currentTime;
	} catch (error) {
		console.error('Invalid token:', error);
		return true;
	}
}
