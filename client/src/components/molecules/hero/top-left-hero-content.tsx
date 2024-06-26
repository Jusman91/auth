import { Typography } from '@/components/atoms';
import { slideInFromTop } from '@/lib/utils';
import { motion } from 'framer-motion';

const TopLeftHeroContent = () => {
	return (
		<motion.div
			variants={slideInFromTop}
			className='shadow-elements w-fit py-4 px-8 rounded-3xl'>
			<Typography
				text='Welcome'
				className='text-3xl text-gradient leading-snug tracking-widest first-letter:text-7xl first-letter:font-thin'
			/>
		</motion.div>
	);
};

export default TopLeftHeroContent;
