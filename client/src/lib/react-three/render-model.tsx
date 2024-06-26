import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';
import { cn } from '../utils';
import { Environment } from '@react-three/drei';

export interface IRenderModel {
	className?: string;
	children: ReactNode;
}
const RenderModel = ({
	children,
	className,
}: IRenderModel) => {
	return (
		<Canvas
			shadows
			className={cn(
				'w-screen h-screen z-10 relative',
				className,
			)}>
			<Suspense fallback={null}>
				{children}
				<Environment preset='night' />
			</Suspense>
		</Canvas>
	);
};

export default RenderModel;
