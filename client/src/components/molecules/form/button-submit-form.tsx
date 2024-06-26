import { cn } from '@/lib/utils';
import { Button, Loading } from '../../atoms';
import { IButtonSubmitFormProps } from '@/types';
import { useFormContext } from '@/hooks';
import { getTxtBtnSubmitAuthForm } from '@/lib/utils/auth';

const ButtonSubmitForm = ({
	disabled,
	loading,
	className,
}: IButtonSubmitFormProps) => {
	const { name } = useFormContext();
	const txtBtn = getTxtBtnSubmitAuthForm(name);
	return (
		<div>
			{loading ? (
				<Loading
					tip='Loading'
					className='text-color-base'
				/>
			) : (
				<Button
					disabled={disabled}
					className={cn(
						'bg-primary-80 w-full h-[57px] py-4 px-[18px] rounded-xl',
						className,
					)}
					type='primary'
					htmlType='submit'>
					{txtBtn}
				</Button>
			)}
		</div>
	);
};

export default ButtonSubmitForm;
