import { useFormContext } from '@/hooks/use-context';
import { authFormLoginValidations } from '@/validations/auth-form-validation';
import { Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Item } = Form;

const AuthFormFields = () => {
	const { formName } = useFormContext();
	const forgotPassword = formName === 'forgot-password';
	return (
		<>
			<Item
				name='email'
				label='Email'
				required
				rules={authFormLoginValidations.email}
				hasFeedback
				className='mb-0'>
				<Input
					size='large'
					placeholder='Masukkan email'
					className='p-4'
				/>
			</Item>
			{forgotPassword ? null : (
				<>
					<Item
						name='password'
						label='Password'
						required
						rules={authFormLoginValidations.password}
						className='mb-0'>
						<Input.Password
							size='large'
							autoComplete='off'
							placeholder='Masukkan password'
							className='p-4'
						/>
					</Item>
					<div className='flex justify-between'>
						<Item
							name='rememberMe'
							valuePropName='checked'
							noStyle>
							<Checkbox>Simpan Password</Checkbox>
						</Item>
						<Link
							to={'/authentication/forgot-password'}
							className='text-sm font-medium text-primary-80'>
							Lupa Password?
						</Link>
					</div>
				</>
			)}
		</>
	);
};

export default AuthFormFields;
