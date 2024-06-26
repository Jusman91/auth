import { Typography } from '@/components/atoms';
import { TwinkleStarsBackground } from '@/components/organisms';

const About = () => {
	return (
		<section>
			<TwinkleStarsBackground />
			<div className='grid place-items-center min-h-screen'>
				<Typography
					text='About'
					className='text-gradient text-5xl'
				/>
			</div>
		</section>
	);
};

export default About;
