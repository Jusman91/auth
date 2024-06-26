import { cn } from '@/lib/utils';
import { ITypographyProps } from '@/types';

const Typography = ({
	text,
	className,
}: ITypographyProps) => {
	return (
		<h2 className={cn('text-color-base', className)}>
			{text}
		</h2>
	);
};

export default Typography;
