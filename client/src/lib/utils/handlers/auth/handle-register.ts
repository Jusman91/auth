import { IHandleRegisterProps } from '@/types';

export function handleRegister({
	userRegister,
	formFields,
	openModal,
}: IHandleRegisterProps) {
	userRegister(formFields, {
		onSuccess: () => {
			openModal();
		},
		onError: () => {
			openModal();
		},
	});
}
