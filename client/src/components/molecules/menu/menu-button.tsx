import { Tooltip } from 'antd';
import { Button, IconSvg } from '../../atoms';
import { ICON_MENU } from '@/assets/img';
import { IMenuButton } from '@/types';

const MenuButton = ({ setOpen }: IMenuButton) => {
	return (
		<Tooltip title='Menus'>
			<Button
				onClick={() => setOpen()}
				type='text'
				className='w-12 h-12 md:w-24 md:h-24'>
				<IconSvg
					className='w-12 h-12 md:w-24 md:h-24 object-cover'
					src={ICON_MENU}
					alt='menu'
				/>
			</Button>
		</Tooltip>
	);
};

export default MenuButton;
