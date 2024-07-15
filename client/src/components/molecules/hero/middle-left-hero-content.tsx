import { Typography } from '@/components/atoms';
import { slideInFromLeft } from '@/lib/utils';
import { motion } from 'framer-motion';

const MiddleLeftHeroContent = () => {
	return (
		<motion.div
			variants={slideInFromLeft(2)}
			className='text-sm md:text-lg'>
			<Typography
				text='This website was created for learning,'
				className='text-general-60 leading-snug'
			/>
			<div className='flex gap-2 items-center lg:justify-center flex-wrap'>
				<Typography
					text='so if you log out your account will be'
					className='text-warning-40 font-normal'
				/>
				<Typography
					text='Deleted'
					className='text-danger-50'
				/>
			</div>
		</motion.div>
	);
};

export default MiddleLeftHeroContent;
