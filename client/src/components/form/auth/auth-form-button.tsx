import Button from '@/components/elements/button';
import { useFormContext } from '@/hooks/use-context';
import { useForm } from '@/hooks/use-form';
import { Form, Spin } from 'antd';

const { Item } = Form;
const AuthFormButton = () => {
	const { form, formName, submittable } = useFormContext();
	const { SetSubmittable } = useForm();
	const fieldsValue = Form.useWatch([], form);
	SetSubmittable(fieldsValue);
	const login = formName === 'login';
	const loading = false;
	return (
		<Item>
			{loading ? (
				<Spin tip='Loading...' size='large' className=''>
					<div />
				</Spin>
			) : (
				<Button
					disabled={!submittable}
					className='bg-primary-80 w-full h-[57px] py-4 px-[18px] rounded-xl'
					type='primary'
					htmlType='submit'>
					{login ? 'Masuk' : 'Reset Password'}
				</Button>
			)}
		</Item>
	);
};

export default AuthFormButton;
