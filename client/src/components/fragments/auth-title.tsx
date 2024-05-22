import { useFormContext } from '@/hooks/use-context';
import { IAuthTitleProps } from '@/types';
import { cn } from '@/lib/utils/utils';
import IconArrow from '@/assets/img/icon/arrow-left.svg';

const AuthTitle = ({
	title,
	subtitle,
	className,
}: IAuthTitleProps) => {
	const { formName } = useFormContext();
	const iconTitle = formName === 'forgot-password';
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-6'>
				<img
					className={cn(iconTitle ? 'block' : 'hidden')}
					src={IconArrow}
					alt=''
				/>
				<h2 className={cn('text-color-base', className)}>
					{title}
				</h2>
			</div>
			<sub className='text-sm md:text-base font-medium text-general-40'>
				{subtitle}
			</sub>
		</div>
	);
};

export default AuthTitle;
