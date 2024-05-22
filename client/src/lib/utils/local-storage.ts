import { key } from '@/static/key';
import { IUser } from '@/types';

export function saveTheme(theme: string) {
	return localStorage.setItem(key.THEME_STORAGE_KEY, theme);
}

export function getTheme() {
	return localStorage.getItem(key.THEME_STORAGE_KEY);
}

export function saveAccessToken({
	rememberMe,
	accessToken,
}: {
	rememberMe: boolean;
	accessToken: string;
}) {
	if (rememberMe) {
		localStorage.setItem(
			key.ACCESS_TOKEN_STORAGE_KEY,
			JSON.stringify(accessToken),
		);
	} else {
		sessionStorage.setItem(
			key.ACCESS_TOKEN_STORAGE_KEY,
			JSON.stringify(accessToken),
		);
	}
}

export function getAccessToken() {
	const accessToken =
		localStorage.getItem(key.ACCESS_TOKEN_STORAGE_KEY) ||
		sessionStorage.getItem(key.ACCESS_TOKEN_STORAGE_KEY);

	return accessToken ? JSON.parse(accessToken) : '{}';
}

export function saveUser(user: IUser, rememberMe: boolean) {
	const userString = JSON.stringify(user);
	if (rememberMe) {
		localStorage.setItem(key.USER_STORAGE_KEY, userString);
	} else {
		sessionStorage.setItem(
			key.USER_STORAGE_KEY,
			userString,
		);
	}
}

export function getUser(): IUser {
	const user =
		localStorage.getItem(key.USER_STORAGE_KEY) ||
		sessionStorage.getItem(key.USER_STORAGE_KEY);
	return user ? JSON.parse(user) : null;
}

export function clearUser() {
	localStorage.clear();
	sessionStorage.clear();
}

export function saveAuthenticated(
	authenticated: boolean,
	rememberMe: boolean,
) {
	const authString = JSON.stringify(authenticated);
	if (rememberMe) {
		localStorage.setItem(
			key.AUTHENTICATED_STORAGE_KEY,
			authString,
		);
	} else {
		sessionStorage.setItem(
			key.AUTHENTICATED_STORAGE_KEY,
			authString,
		);
	}
}

export function getAuthenticated() {
	const authenticatedString =
		localStorage.getItem(key.AUTHENTICATED_STORAGE_KEY) ||
		sessionStorage.getItem(key.AUTHENTICATED_STORAGE_KEY);
	if (authenticatedString !== null) {
		return JSON.parse(authenticatedString);
	}
}
