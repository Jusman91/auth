import { Gundam, RenderModel } from '@/lib/react-three';
import { AnimateFloating } from '@/lib/utils/animate-floating';
import {
	OrbitControls,
	PerspectiveCamera,
} from '@react-three/drei';

const GundamShow = () => {
	return (
		<RenderModel>
			<AnimateFloating
				config={{
					duration: 6,
					repeat: Infinity,
					repeatType: 'reverse',
				}}>
				<OrbitControls
					target={[0, 1.9, 0]}
					maxPolarAngle={1.45}
				/>
				<PerspectiveCamera
					makeDefault
					fov={50}
					position={[3, 2, 5]}
				/>

				<Gundam position={[0, -0.5, 0]} />

				<spotLight
					color={[1, 0.25, 0.7]}
					intensity={1.5}
					angle={0.6}
					penumbra={0.5}
					position={[5, 5, 0]}
					castShadow
					shadow-bias={-0.0001}
				/>
				<spotLight
					color={[0.14, 0.5, 1]}
					intensity={2}
					angle={0.6}
					penumbra={0.5}
					position={[5, 5, 0]}
					castShadow
					shadow-bias={-0.0001}
				/>
			</AnimateFloating>
		</RenderModel>
	);
};

export default GundamShow;
