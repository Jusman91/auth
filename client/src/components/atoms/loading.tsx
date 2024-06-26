import { Spin, type SpinProps } from 'antd';

const Loading = ({ ...props }: SpinProps) => {
	return (
		<Spin {...props}>
			<div className='p-8 ' />
		</Spin>
	);
};

export default Loading;
