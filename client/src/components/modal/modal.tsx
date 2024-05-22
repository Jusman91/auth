import { useToggle } from '@/hooks/use-toggle';
import { Modal } from 'antd';
import { ReactNode } from 'react';

const ModalCustom = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [open, setOpen] = useToggle(true);
	const onCancel = () => {
		setOpen(false);
	};
	return (
		<Modal
			centered
			open={open}
			footer={null}
			closeIcon={null}
			onCancel={onCancel}
			className='w-full max-w-[500px]'>
			{children}
		</Modal>
	);
};

export default ModalCustom;
