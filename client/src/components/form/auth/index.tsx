import { Form } from 'antd';
import AuthFormLogo from './auth-form-logo';
import AuthFormHeader from './auth-form-header';
import AuthFormFields from './auth-form-fields';
import AuthFormButton from './auth-form-button';
import { useFormContext } from '@/hooks/use-context';
import { ILoginInput } from '@/types';
import { useAuthHandlers } from '@/hooks/use-auth-handlers';

const AuthForm = () => {
	const { form, formName } = useFormContext();
	const { handleSubmit } = useAuthHandlers();
	const initialValues: ILoginInput = {
		email: '',
		password: '',
		rememberMe: true,
	};

	// const handleSubmitt = (values: any) => {
	// 	console.log(values);
	// };

	return (
		<Form
			name={formName}
			form={form}
			initialValues={initialValues}
			onFinish={handleSubmit}
			layout='vertical'
			autoComplete='off'
			className='flex flex-col justify-center gap-6 w-full h-full p-6 md:p-16 bg-white border border-primary-10 rounded-2xl'>
			<AuthFormLogo />
			<AuthFormHeader />
			<AuthFormFields />
			<AuthFormButton />
		</Form>
	);
};

export default AuthForm;
