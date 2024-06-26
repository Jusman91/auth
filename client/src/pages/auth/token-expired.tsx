import { ICON_EXPIRED } from '@/assets/img';
import { IconSvg, Typography } from '@/components/atoms';
import { SwitchAuthPage } from '@/components/molecules';

const TokenExpired = () => {
	return (
		<div className='grid place-items-center max-w-[750px] w-full p-6 md:p-16 bg-bkg-base/85 border border-primary-10 rounded-2xl z-[1] overflow-x-hidden'>
			<IconSvg
				className='w-72 h-7w-72 object-cover'
				src={ICON_EXPIRED}
				alt='Expired'
			/>
			<Typography
				className='text-sm md:text-base text-danger-50'
				text='Invalid or Expired Token!'
			/>
			<SwitchAuthPage
				path='/auth/login'
				desc={'\u{21b5}Back to'}
				txtLink='Login'
			/>
		</div>
	);
};

export default TokenExpired;
