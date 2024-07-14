import { ICON_STAR } from '@/assets/img';

const TwinkleStarsBackground = () => {
	return (
		<div className='absolute inset-0 flex flex-wrap z-[1]'>
			{Array.from({ length: 25 }).map((_, index) => (
				<img
					key={index}
					className='animate-twinkle w-1.5 h-w-1.5 ms-1'
					style={{
						position: 'absolute',
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 2}s`,
					}}
					src={ICON_STAR}
					alt='Star'
				/>
			))}
		</div>
	);
};

export default TwinkleStarsBackground;
