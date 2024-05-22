import { getLoginUserFn, getMeFn } from '@/api/auth';
import {
	useAuthContext,
	useFormContext,
} from '@/hooks/use-context';
import { key } from '@/static/key';
import { ILoginInput } from '@/types';
import {
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import {
	saveAuthenticated,
	saveUser,
} from '../utils/local-storage';

export function useLogin() {
	const mutate = useMutation({
		mutationKey: [key.MUTATION_KEY_LOGIN],
		mutationFn: (userData: ILoginInput) =>
			getLoginUserFn(userData),
		retry: false,
	});
	return mutate;
}

export function useLoggedIn() {
	const { form } = useFormContext();
	const rememberMe = form.getFieldValue('rememberMe');
	const { dispatch } = useAuthContext();
	const query = useQuery({
		queryKey: [key.QUERY_KEY_LOGIN],
		queryFn: getMeFn,
		enabled: false,
		retry: false,
	});

	useEffect(() => {
		if (query.isSuccess) {
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: query.data,
			});
			saveUser(query.data, rememberMe);
			saveAuthenticated(true, rememberMe);
		}
	}, [dispatch, query.data, query.isSuccess, rememberMe]);

	return query;
}
