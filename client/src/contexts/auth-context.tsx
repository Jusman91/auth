import { useLogin } from '@/lib/react-query/auth-query-mutation';
import {
	INITIAL_STATE,
	authReducer,
} from '@/reducers/auth-reducer';
import { IAuthContext } from '@/types';
import {
	ReactNode,
	createContext,
	useMemo,
	useReducer,
} from 'react';

export const AuthContext =
	createContext<IAuthContext>(INITIAL_STATE);

export const AuthContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(
		authReducer,
		INITIAL_STATE,
	);
	const {
		mutate: userLogin,
		isPending,
		error,
	} = useLogin();
	const contextValue: IAuthContext = useMemo(() => {
		return {
			user: state.user,
			isAuthenticated: state.isAuthenticated,
			error: error,
			loading: isPending,
			userLogin: userLogin,
			dispatch,
		};
	}, [
		error,
		isPending,
		state.isAuthenticated,
		state.user,
		userLogin,
	]);
	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
