import { cn } from '@/lib/utils';
import { Button as AntdBtn } from 'antd';
import type { ButtonProps } from 'antd';

const Button = ({
	children,
	className,
	...props
}: ButtonProps) => {
	return (
		<AntdBtn
			{...props}
			className={cn(
				'flex justify-center items-center text-lg font-semibold',
				className,
			)}>
			{children}
		</AntdBtn>
	);
};

export default Button;
