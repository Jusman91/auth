import { handleMenus } from '@/lib/utils/handlers';
import { IHandleMenus } from '@/types';

describe('handleMenus', () => {
	it('should open a new tab when newTab is true', () => {
		const mockOpen = vi
			.spyOn(window, 'open')
			.mockImplementation(() => null);
		const params: IHandleMenus = {
			label: 'github',
			path: 'https://example.com',
			newTab: true,
			id: '123',
			navigate: vi.fn(),
			handleDeleteUser: vi.fn(),
		};

		handleMenus(params);

		expect(mockOpen).toHaveBeenCalledWith(
			'https://example.com',
			'_blank',
		);
		mockOpen.mockRestore(); // Restore the original implementation
	});

	it('should navigate to path when newTab is false', () => {
		const mockNavigate = vi.fn();
		const params: IHandleMenus = {
			label: 'home',
			path: '/',
			newTab: false,
			id: '123',
			navigate: mockNavigate,
			handleDeleteUser: vi.fn(),
		};

		handleMenus(params);

		expect(mockNavigate).toHaveBeenCalledWith('/');
	});

	it('should call handleDeleteUser when label is logout', () => {
		const mockHandleDeleteUser = vi.fn();
		const mockNavigate = vi.fn();
		const params: IHandleMenus = {
			label: 'logout',
			path: '/logout',
			newTab: false,
			id: '123',
			navigate: mockNavigate,
			handleDeleteUser: mockHandleDeleteUser,
		};

		handleMenus(params);

		expect(mockHandleDeleteUser).toHaveBeenCalledWith({
			id: '123',
			navigate: mockNavigate,
		});
	});
});
