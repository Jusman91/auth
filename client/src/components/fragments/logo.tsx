import myLogo from '@/assets/img/logo/logo.svg';

const Logo = () => {
	return (
		<div className='flex items-center gap-2 w-[150px] p-[0.85px]'>
			<img
				className='w-[27.43px] h-[27.43px]'
				src={myLogo}
				alt='Logo'
			/>
			<h3 className='text-[27.43px] text-primary-80 font-semibold tracking-tighter leading-normal'>
				MeBuzz
			</h3>
		</div>
	);
};

export default Logo;
