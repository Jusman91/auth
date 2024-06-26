import { visible } from '@/lib/utils';
import { motion } from 'framer-motion';
import Menus from '../menus/menus';
import {
	MiddleLeftHeroContent,
	TopLeftHeroContent,
} from '@/components/molecules';

const HeroContentLeft = () => {
	return (
		<div className='flex flex-col gap-8 justify-center'>
			<TopLeftHeroContent />
			<MiddleLeftHeroContent />
			<motion.div variants={visible(3)}>
				<Menus />
			</motion.div>
		</div>
	);
};

export default HeroContentLeft;
