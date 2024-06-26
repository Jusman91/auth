import {
	MenuButton,
	MenuListButton,
} from '@/components/molecules';
import { useToggle } from '@/hooks';
import { cn } from '@/lib/utils';
import { handleMenus } from '@/lib/utils/handlers';
import { menuListData } from '@/static';
import { useNavigate } from 'react-router-dom';

const Menus = () => {
	const [open, setOpen] = useToggle(false);
	const navigate = useNavigate();
	return (
		<div
			className={cn(
				'flex gap-4 duration-500',
				open ? 'w-full' : 'w-0',
			)}>
			<MenuButton setOpen={() => setOpen()} />
			<div
				className={cn(
					'flex items-center gap-4 w-0 opacity-0 duration-500',
					open
						? 'w-full opacity-100'
						: 'w-0 opacity-0 hidden',
				)}>
				{menuListData.map((item, idx) => (
					<MenuListButton
						key={idx}
						label={item.label}
						onClick={() =>
							handleMenus({
								label: item.label,
								path: item.path,
								newTab: item.newTab,
								navigate,
							})
						}
					/>
				))}
			</div>
		</div>
	);
};

export default Menus;
