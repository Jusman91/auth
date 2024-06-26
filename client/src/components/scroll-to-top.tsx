import { useScrollToTop } from '@/hooks';
import { ReactNode } from 'react';

const ScrollToTop = ({
	children,
}: {
	children: ReactNode;
}) => {
	useScrollToTop();
	return <>{children}</>;
};

export default ScrollToTop;
