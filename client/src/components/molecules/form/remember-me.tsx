import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const RememberMe = () => {
	return (
		<div className='flex justify-between'>
			<Checkbox className='text-color-base' defaultChecked>
				Remember Me
			</Checkbox>
			<Link
				to={'/auth/forgot-password'}
				className='text-sm font-medium text-primary-40 hover:text-primary-30'>
				Forgot Password?
			</Link>
		</div>
	);
};

export default RememberMe;
