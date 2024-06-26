const LabelInput = ({ text }: { text: string }) => {
	return (
		<span className='text-sm leading-5 text-color-base capitalize'>
			{text}
		</span>
	);
};

export default LabelInput;
