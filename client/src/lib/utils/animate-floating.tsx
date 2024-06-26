import { IAnimateFloatingProps } from '@/types';
import { MotionConfig } from 'framer-motion';
import { motion } from 'framer-motion-3d';

export const AnimateFloating = ({
	children,
	config,
}: IAnimateFloatingProps) => {
	return (
		<MotionConfig transition={config}>
			<motion.group animate={{ y: [0, 0.2, 0] }}>
				{children}
			</motion.group>
		</MotionConfig>
	);
};
