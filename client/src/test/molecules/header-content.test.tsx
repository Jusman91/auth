import { HeaderContent } from '@/components/molecules';
import { render, screen } from '../unit-testing';
import { IHeaderContentProps } from '@/types';

describe('Molecules - HeaderContent', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderHeaderContent = ({
		title,
		subtitle,
	}: IHeaderContentProps) => {
		return render(
			<HeaderContent title={title} subtitle={subtitle} />,
		);
	};

	it('should display element if subtitle exists', () => {
		RenderHeaderContent({
			title: 'Title',
			subtitle: 'show subtitle',
		});
		const subtitleEl = screen.getByRole('heading', {
			name: 'show subtitle',
		});
		expect(subtitleEl).toBeInTheDocument();
		expect(screen.getAllByRole('heading')).toHaveLength(2);
	});

	it('should not display element if subtitle not exists', () => {
		RenderHeaderContent({
			title: 'Title',
		});
		const subtitleEl = screen.getAllByRole('heading');
		expect(subtitleEl).toHaveLength(1);
	});
});
