import { IFormContext, IFormProviderProps } from '@/types';
import { Form } from 'antd';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

export const FormContext = createContext<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	IFormContext<any> | undefined
>(undefined);

export const FormContextProvider = <TValues,>({
	children,
	name,
}: IFormProviderProps) => {
	const [form] = Form.useForm();
	const [submittable, setSubmittable] = useState(false);
	const values = Form.useWatch([], form); // watch for changes to the values

	const setFieldsValue = useCallback(
		(values: TValues) => {
			form.setFieldsValue(values);
		},
		[form],
	);

	const resetFieldsValue = useCallback(() => {
		form.resetFields();
	}, [form]);

	useEffect(() => {
		const validate = async () => {
			try {
				await form.validateFields({ validateOnly: true });
				setSubmittable(true);
			} catch {
				setSubmittable(false);
			}
		};

		validate();
	}, [form, values]);

	useEffect(() => {
		form.resetFields();
	}, [form, name]);

	const valueContext: IFormContext<TValues> =
		useMemo(() => {
			return {
				form,
				name,
				values,
				submittable,
				resetFieldsValue,
				setFieldsValue,
			};
		}, [
			form,
			name,
			resetFieldsValue,
			setFieldsValue,
			submittable,
			values,
		]);
	return (
		<FormContext.Provider value={valueContext}>
			{children}
		</FormContext.Provider>
	);
};
