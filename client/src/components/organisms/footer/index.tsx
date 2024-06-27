import { Typography } from '@/components/atoms';

const Footer = () => {
	return (
		<footer className='w-full h-[70px] flex justify-center items-center text-center border-t border-general-10 p-6 bg-transparent'>
			<Typography
				text='Copyright ©2024 MeDiscover, All rights Reserved'
				className='font-semibold leading-snug text-base'
			/>
		</footer>
	);
};

export default Footer;
