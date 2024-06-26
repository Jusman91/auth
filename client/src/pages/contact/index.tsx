import { Typography } from '@/components/atoms';
import { TwinkleStarsBackground } from '@/components/organisms';

const Contact = () => {
	return (
		<section>
			<TwinkleStarsBackground />
			<div className='grid place-items-center min-h-screen'>
				<Typography
					text='Contact'
					className='text-gradient text-5xl'
				/>
			</div>
		</section>
	);
};

export default Contact;
