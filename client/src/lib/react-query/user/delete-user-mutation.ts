import { deleteUser } from '@/api';
import { keys } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteUser() {
	const mutate = useMutation({
		mutationKey: [keys.DELETE_USER],
		mutationFn: (id: string) => deleteUser(id),
		retry: false,
	});
	return mutate;
}
