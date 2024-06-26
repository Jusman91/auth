import { slideInFromRight } from '@/lib/utils';
import { motion } from 'framer-motion';
import { GundamShow } from '..';

const HeroContentRight = () => {
	return (
		<div className='flex-1 w-full h-[80vh] relative'>
			<motion.div
				variants={slideInFromRight(3.5)}
				className='absolute h-full w-full -right-48'>
				<GundamShow />
			</motion.div>
		</div>
	);
};

export default HeroContentRight;
