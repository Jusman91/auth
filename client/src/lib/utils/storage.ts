import {
	ISaveAccessToken,
	ISaveAuthenticated,
	ISaveUser,
	IUser,
	keys,
} from '../../types';

export function saveThemeToStorage(theme: string) {
	return localStorage.setItem(keys.THEME_STORAGE, theme);
}

export function getThemeInStorage() {
	return localStorage.getItem(keys.THEME_STORAGE);
}

export function saveAccessTokenToStorage({
	accessToken,
	rememberMe,
}: ISaveAccessToken) {
	const storage = rememberMe
		? localStorage
		: sessionStorage;
	storage.setItem(
		keys.ACCESSTOKEN_STORAGE,
		JSON.stringify(accessToken),
	);
}

export function getAccessTokenInStorage() {
	const accessToken =
		localStorage.getItem(keys.ACCESSTOKEN_STORAGE) ||
		sessionStorage.getItem(keys.ACCESSTOKEN_STORAGE);

	return accessToken ? JSON.parse(accessToken) : '{}';
}

export function saveUserToStorage({
	user,
	rememberMe,
}: ISaveUser) {
	const userString = JSON.stringify(user);
	const storage = rememberMe
		? localStorage
		: sessionStorage;

	storage.setItem(keys.USER_STORAGE, userString);
}

export function getUserInStorage(): IUser {
	const user =
		localStorage.getItem(keys.USER_STORAGE) ||
		sessionStorage.getItem(keys.USER_STORAGE);
	return user ? JSON.parse(user) : null;
}

export function clearUserInStorage() {
	localStorage.clear();
	sessionStorage.clear();
}

export function saveAuthenticatedToStorage({
	authenticated,
	rememberMe,
}: ISaveAuthenticated) {
	const authenticatedString = JSON.stringify(authenticated);
	const storage = rememberMe
		? localStorage
		: sessionStorage;
	storage.setItem(
		keys.AUTHENTICATED_STORAGE,
		authenticatedString,
	);
}

export function getAuthenticatedInStorage() {
	const authenticatedString =
		localStorage.getItem(keys.AUTHENTICATED_STORAGE) ||
		sessionStorage.getItem(keys.AUTHENTICATED_STORAGE);
	return authenticatedString !== null
		? JSON.parse(authenticatedString)
		: null;
}
