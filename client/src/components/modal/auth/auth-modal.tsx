import ModalCustom from '../modal';
import AuthModalContent from '@/components/fragments/auth-modal-content';
import SuccessIcon from '@/assets/img/icon/row-success.svg';
import FiledIcon from '@/assets/img/icon/row-success.svg';
import { IAuthModalProps } from '@/types';

const AuthModal = ({ success }: IAuthModalProps) => {
	const title = success ? 'Login Berhasil' : 'Login Gagal';
	const icon = success ? SuccessIcon : FiledIcon;
	return (
		<ModalCustom>
			<AuthModalContent
				icon={icon}
				title={title}
				subtitle='Selamat datang di MeBuzz'
			/>
		</ModalCustom>
	);
};

export default AuthModal;
