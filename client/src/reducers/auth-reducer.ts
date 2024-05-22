import {
	clearUser,
	getAuthenticated,
	getUser,
} from '@/lib/utils/local-storage';
import { AuthAction, IAuthContext } from '@/types';

export const INITIAL_STATE: IAuthContext = {
	user: getUser(),
	isAuthenticated: getAuthenticated(),
	error: null,
	loading: false,
	dispatch: () => {},
	userLogin: () => undefined,
};

export const authReducer = (
	state = INITIAL_STATE,
	action: AuthAction,
): IAuthContext => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case 'LOGOUT':
			clearUser();
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
