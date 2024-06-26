import { Link } from 'react-router-dom';
import { Typography } from '../../atoms';
import { useThemeContext } from '@/hooks';
import { cn } from '@/lib/utils';
import { ISwitchAuthProps } from '@/types';

const SwitchAuthPage = ({
	desc,
	path,
	txtLink,
}: ISwitchAuthProps) => {
	const { myTheme } = useThemeContext();
	const darkTheme = myTheme === 'dark';

	return (
		<div className='flex items-center justify-center gap-1'>
			<Typography
				text={desc}
				className={cn(
					'text-sm font-normal',
					darkTheme ? 'text-primary-40' : 'text-color-base',
				)}
			/>
			<Link
				to={path}
				className={cn(
					'text-sm capitalize font-semibold hover:text-primary-40',
					darkTheme ? 'text-color-base' : 'text-primary-80',
				)}>
				{txtLink}
			</Link>
		</div>
	);
};

export default SwitchAuthPage;
