import { APP_LOGO } from '@/assets/img';
import { IconSvg, Typography } from '../atoms';

const AppLogo = () => {
	return (
		<div className='flex items-center gap-2 w-[150px] p-[0.85px]'>
			<IconSvg
				src={APP_LOGO}
				alt='Logo'
				className='w-[27.43px] h-[27.43px] object-cover'
			/>
			<Typography
				text='MeDiscover'
				className='text-[27.43px] text-gradient font-semibold tracking-tighter leading-normal'
			/>
		</div>
	);
};

export default AppLogo;
