import { VIDEO_HOLE } from '@/assets/video';

const BgVideo = () => {
	return (
		<div className='relative w-full h-screen'>
			<video
				autoPlay
				muted
				loop
				className='w-full h-full object-cover rotate-180 absolute left-0 -top-64'>
				<source src={VIDEO_HOLE} type='video/webm' />
			</video>
		</div>
	);
};

export default BgVideo;
