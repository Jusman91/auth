import { LabelInput } from '@/components/atoms';
import { RememberMe } from '@/components/molecules';
import { FormName } from '@/types';
import { getAuthFormValidations } from '@/validations';
import { FormItemProps, Input } from 'antd';

export function getFieldsAuthFormData(formName: FormName) {
	const validations = getAuthFormValidations(formName);
	const fieldItems: FormItemProps[] = [
		{
			name: 'username',
			label: <LabelInput text='Username' />,
			required: true,
			rules: validations.username,
			hasFeedback: true,
			children: (
				<Input
					size='large'
					placeholder='Type your username'
					className='p-4'
				/>
			),
		},
		{
			name: 'email',
			label: <LabelInput text='Email' />,
			required: true,
			rules: validations.email,
			hasFeedback: true,
			children: (
				<Input
					size='large'
					placeholder='Type your email'
					className='p-4'
				/>
			),
		},
		{
			name: 'password',
			label: <LabelInput text='Password' />,
			required: true,
			dependencies: ['password'],
			rules: validations.password,
			hasFeedback: true,
			children: (
				<Input.Password
					size='large'
					autoComplete='off'
					placeholder='Type your password'
					className='p-4'
				/>
			),
		},
		{
			name: 'confirmPassword',
			label: <LabelInput text='Confirm Password' />,
			required: true,
			dependencies: ['password'],
			rules: validations.confirmPassword,
			hasFeedback: true,
			children: (
				<Input.Password
					size='large'
					autoComplete='off'
					placeholder='Confirm password'
					className='p-4'
				/>
			),
		},
		{
			name: 'rememberMe',
			valuePropName: 'checked',
			noStyle: true,
			children: <RememberMe />,
		},
	];

	return { fieldItems };
}
