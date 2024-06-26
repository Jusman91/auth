import { IHandleForgotPasswordProps } from '@/types';

export function handleForgotPassword({
	sendRequest,
	formFields,
	openModal,
}: IHandleForgotPasswordProps) {
	sendRequest(formFields, {
		onSuccess: () => {
			openModal();
		},
		onError: () => {
			openModal();
		},
	});
}
