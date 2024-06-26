import { Modal } from 'antd';
import { IconSvg } from '@/components/atoms';
import { HeaderContent } from '@/components/molecules';
import { ICON_FAILED, ICON_SUCCESS } from '@/assets/img';
import { IAuthModalProps } from '@/types';
import { formatTextWithHyphen } from '@/lib/utils/format-text-with-hyphen';
import { useThemeContext } from '@/hooks';
import { cn } from '@/lib/utils';

const AuthModal = ({
	title,
	description,
	isSuccess,
	...props
}: IAuthModalProps) => {
	const icon = isSuccess ? ICON_SUCCESS : ICON_FAILED;
	const titleModal = formatTextWithHyphen(title);
	const { myTheme } = useThemeContext();
	const darkTheme = myTheme === 'dark';
	return (
		<Modal
			{...props}
			centered
			footer={null}
			closeIcon={null}
			closable
			className='w-full max-w-[500px]'>
			<div
				className={cn(
					'flex flex-col justify-center items-center gap-6 py-11 px-6 rounded-2xl',
					darkTheme ? 'bg-general-90' : 'bg-white',
				)}>
				<IconSvg src={icon} />
				<HeaderContent
					classWrapper='text-center'
					classTitle='text-[32px] leading-snug capitalize'
					classSubtitle='md:text-xl'
					title={titleModal}
					subtitle={description}
				/>
			</div>
		</Modal>
	);
};

export default AuthModal;
