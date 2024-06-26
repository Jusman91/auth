import { IIconSvgProps } from '@/types';

const IconSvg = ({
	src,
	alt,
	className,
}: IIconSvgProps) => {
	return <img className={className} src={src} alt={alt} />;
};

export default IconSvg;
