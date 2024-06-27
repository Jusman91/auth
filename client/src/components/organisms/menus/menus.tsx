import {
	MenuButton,
	MenuListButton,
} from '@/components/molecules';
import { useToggle } from '@/hooks';
import { useDeleteUser } from '@/lib/react-query';
import { cn } from '@/lib/utils';
import { handleMenus } from '@/lib/utils/handlers';
import { getUserInStorage } from '@/lib/utils/storage';
import { menuListData } from '@/static';
import { IMenuListData } from '@/types';
import { useNavigate } from 'react-router-dom';

const Menus = () => {
	const { id } = getUserInStorage();
	const [open, setOpen] = useToggle(false);
	const navigate = useNavigate();
	const { mutate: userDeleted } = useDeleteUser();
	const onClick = (
		e: React.MouseEvent,
		item: IMenuListData,
	) => {
		e.preventDefault();
		handleMenus({
			label: item.label,
			path: item.path,
			newTab: item.newTab,
			navigate,
			userDeleted,
			id,
		});
	};
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
						onClick={(e) => onClick(e, item)}
					/>
				))}
			</div>
		</div>
	);
};

export default Menus;
