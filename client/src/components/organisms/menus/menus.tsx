import { Loading } from '@/components/atoms';
import {
	MenuButton,
	MenuListButton,
} from '@/components/molecules';
import { useDelete, useToggle } from '@/hooks';
import { cn } from '@/lib/utils';
import { handleMenus } from '@/lib/utils/handlers';
import { getUserInStorage } from '@/lib/utils/storage';
import { menuListData } from '@/static';
import { IMenuListData } from '@/types';
import { useNavigate } from 'react-router-dom';

const Menus = () => {
	const user = getUserInStorage();
	const id = user?.id;
	const [open, setOpen] = useToggle(false);
	const navigate = useNavigate();
	const { handleDeleteUser, isDeleting } = useDelete();
	const onClick = (
		e: React.MouseEvent,
		item: IMenuListData,
	) => {
		e.preventDefault();
		handleMenus({
			label: item.label,
			path: item.path,
			newTab: item.newTab,
			id,
			navigate,
			handleDeleteUser: () =>
				handleDeleteUser({ id, navigate }),
		});
	};
	return (
		<div
			className={cn(
				'flex gap-4 duration-500',
				open ? 'w-full' : 'w-0',
			)}>
			<MenuButton setOpen={() => setOpen()} />
			<ul
				aria-label='menu-list'
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
			</ul>
			{isDeleting ? (
				<Loading
					className='text-color-base'
					tip='Loading'
					size='large'
					fullscreen
				/>
			) : null}
		</div>
	);
};

export default Menus;
