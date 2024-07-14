import { IMenuListButtonProps } from '@/types';
import { Tooltip } from 'antd';
import { Button } from '../../atoms';
import getIconMenus from '@/lib/utils/get-icon-menus';

const MenuListButton = ({
	label,
	onClick,
}: IMenuListButtonProps) => {
	return (
		<div className='flex justify-center items-center w-16 h-16 rounded-full shadow-elements hover:shadow-glass-sm cursor-pointer'>
			<Tooltip title={label} rootClassName='capitalize'>
				<Button
					type='link'
					className='w-full h-full'
					icon={getIconMenus(label)}
					onClick={onClick}
					aria-label={label}
				/>
			</Tooltip>
		</div>
	);
};

export default MenuListButton;
