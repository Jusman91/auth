import { motion } from 'framer-motion';
import HeroContentLeft from './hero-content-left';
import HeroContentRight from './hero-content-right';
import { BgVideo } from '@/components/atoms';
import TwinkleStarsBackground from '../twinkle-stars-background';

const HeroHomePage = () => {
	return (
		<div className='flex flex-col justify-center items-center min-h-screen relative'>
			<TwinkleStarsBackground />
			<BgVideo />
			<div className='w-full px-6 lg:px-20 absolute z-[10]'>
				<motion.div initial='hidden' animate='visible'>
					<div className='flex justify-between items-center gap-8'>
						<HeroContentLeft />
						<HeroContentRight />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroHomePage;
