import { useDeleteUserMutation } from '@/lib/react-query';
import { clearUserInStorage } from '@/lib/utils/storage';
import { IHandleDeleteUser } from '@/types';

const useDelete = () => {
	const { mutate: userDeleted, isPending: isDeleting } =
		useDeleteUserMutation();
	const handleDeleteUser = ({
		id,
		navigate,
	}: IHandleDeleteUser) => {
		userDeleted(id, {
			onSuccess: () => {
				clearUserInStorage();
				navigate('/auth/login');
			},
			onError: (data) => {
				console.log(data?.message);
			},
		});
	};
	return {
		handleDeleteUser,
		isDeleting,
	};
};

export default useDelete;
