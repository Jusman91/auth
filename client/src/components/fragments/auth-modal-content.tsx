import { IAuthModalContentProps } from '@/types';

const AuthModalContent = ({
	icon,
	title,
	subtitle,
}: IAuthModalContentProps) => {
	return (
		<div className='flex flex-col justify-center items-center gap-6 py-11 px-6 ove'>
			<img src={icon} alt='Icon' />
			<div className='flex flex-col text-center gap-3'>
				<h4 className='text-[32px] leading-snug'>
					{title}
				</h4>
				<sub className='text-xl font-medium text-general-40'>
					{subtitle}
				</sub>
			</div>
		</div>
	);
};

export default AuthModalContent;
