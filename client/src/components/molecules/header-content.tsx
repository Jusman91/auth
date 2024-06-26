import { IHeaderContentProps } from '@/types';
import { Typography } from '../atoms';
import { cn } from '@/lib/utils';

const HeaderContent = ({
	title,
	subtitle,
	classTitle,
	classSubtitle,
	classWrapper,
}: IHeaderContentProps) => {
	return (
		<div
			className={cn(
				'first-letter:capitalize',
				classWrapper,
			)}>
			<Typography
				text={title}
				className={cn('text-h2', classTitle)}
			/>
			{subtitle ? (
				<Typography
					text={subtitle}
					className={cn(
						'text-sm font-medium text-general-40',
						classSubtitle,
					)}
				/>
			) : null}
		</div>
	);
};

export default HeaderContent;
