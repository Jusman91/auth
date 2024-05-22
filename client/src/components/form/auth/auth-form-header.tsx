import AuthTitle from '@/components/fragments/auth-title';
import { useFormContext } from '@/hooks/use-context';

const AuthFormHeader = () => {
	const { formName } = useFormContext();
	const title =
		formName === 'forgot-password'
			? `Lupa Password`
			: 'Masuk';
	const subtitle =
		formName === 'forgot-password'
			? 'Kami akan mengirimkan email untuk reset password'
			: 'Silahkan masukkan akun kamu disini';
	return (
		<AuthTitle
			title={title}
			subtitle={subtitle}
			className='text-h2'
		/>
	);
};

export default AuthFormHeader;
