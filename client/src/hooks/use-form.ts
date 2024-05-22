import { useEffect } from 'react';
import { FormName } from '@/types';
import { useFormContext } from './use-context';

export function useForm() {
	const { form, setFormName, setObjURL, setSubmittable } =
		useFormContext();
	const FormName = (name: FormName) => {
		useEffect(() => {
			setFormName(name);
		}, [name]);
	};

	const SetFieldsValue = <T>(values: T) => {
		useEffect(() => {
			if (values) {
				form.setFieldsValue(values);
			}

			return () => {
				form.resetFields();
			};
		}, [values]);
	};

	const SetSubmittable = (values: unknown) => {
		useEffect(() => {
			form.validateFields({ validateOnly: true }).then(
				() => {
					setSubmittable(true);
				},
				() => {
					setSubmittable(false);
				},
			);
		}, [values]);
	};

	const ResetFieldsValue = (isSuccess?: boolean) => {
		useEffect(() => {
			if (isSuccess) {
				form.resetFields();
				setObjURL(undefined);
			}
		}, [isSuccess]);
	};

	const CleanUpObjURL = () => {
		useEffect(() => {
			return () => {
				setObjURL(undefined);
			};
		}, []);
	};

	return {
		FormName,
		SetFieldsValue,
		SetSubmittable,
		ResetFieldsValue,
		CleanUpObjURL,
	};
}
