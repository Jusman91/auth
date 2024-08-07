import { loggedInUser } from '@/api';
import { keys } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useLoggedInQuery() {
	const query = useQuery({
		queryKey: [keys.LOGGEDIN],
		queryFn: loggedInUser,
		enabled: false,
		retry: false,
	});

	return query;
}
