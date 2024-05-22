import { useToggle } from '@/hooks/use-toggle';
import { IFormContext } from '@/types';
import { Form, type UploadFile } from 'antd';
import {
	ReactNode,
	createContext,
	useMemo,
	useState,
} from 'react';

export const FormContext = createContext<
	IFormContext | undefined
>(undefined);

export const FormContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [form] = Form.useForm();
	const [open, setOpen] = useToggle(false);
	const [formName, setFormName] = useState('');
	const [submittable, setSubmittable] = useState(true);
	const [objURL, setObjURL] = useState<UploadFile>();

	const valueContext = useMemo(() => {
		return {
			open,
			setOpen,
			form,
			setFormName,
			submittable,
			setSubmittable,
			setObjURL,
			formName,
			objURL,
		};
	}, [open, setOpen, form, submittable, formName, objURL]);
	return (
		<FormContext.Provider value={valueContext}>
			{children}
		</FormContext.Provider>
	);
};
