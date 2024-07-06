import {
	AppLogo,
	ButtonSubmitForm,
	HeaderContent,
	SwitchAuthPage,
} from '@/components/molecules';
import { Form } from 'antd';
import AuthFields from './auth-fields';
import { cn } from '@/lib/utils';
import { AuthFormProps } from '@/types';
import { useFormContext } from '@/hooks';
import {
	getHeaderAuthFormData,
	getInitialValues,
	getSwitchAuthFormData,
} from '@/lib/utils/auth';

const AuthForm = ({
	loading,
	className,
	...props
}: AuthFormProps) => {
	const { name, submittable } = useFormContext();
	const initialValues = getInitialValues(name);
	const { title, subtitle } = getHeaderAuthFormData(name);
	const { path, desc, txtLink } =
		getSwitchAuthFormData(name);
	return (
		<Form
			{...props}
			name={name}
			initialValues={initialValues}
			onFinish={props.onFinish}
			layout='vertical'
			autoComplete='off'
			className={cn(
				'flex flex-col justify-center gap-6 max-w-[750px] w-full h-[688px] lg:h-[826px] p-6 md:p-16 border border-primary-10 rounded-2xl backdrop-blur-sm bg-glass bg-opacity-60 z-10',
				className,
			)}>
			<AppLogo />
			<HeaderContent
				classSubtitle='md:text-base'
				title={title ?? ''}
				subtitle={subtitle ?? ''}
			/>
			<AuthFields />
			<SwitchAuthPage
				desc={desc}
				path={path}
				txtLink={txtLink}
			/>
			<ButtonSubmitForm
				disabled={!submittable}
				loading={loading}
			/>
		</Form>
	);
};

export default AuthForm;
