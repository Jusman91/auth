import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

window.open = vi.fn();

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

Object.defineProperty(
	window.HTMLCanvasElement.prototype,
	'getContext',
	{
		value: () => ({
			fillStyle: null,
			fillRect: vi.fn(),
			clearRect: vi.fn(),
			getImageData: vi.fn(),
			putImageData: vi.fn(),
			createImageData: vi.fn(),
			setTransform: vi.fn(),
			drawImage: vi.fn(),
			save: vi.fn(),
			fillText: vi.fn(),
			restore: vi.fn(),
			beginPath: vi.fn(),
			moveTo: vi.fn(),
			lineTo: vi.fn(),
			closePath: vi.fn(),
			stroke: vi.fn(),
			translate: vi.fn(),
			scale: vi.fn(),
			rotate: vi.fn(),
			arc: vi.fn(),
			arcTo: vi.fn(),
			fill: vi.fn(),
			rect: vi.fn(),
			clip: vi.fn(),
		}),
	},
);

afterEach(() => {
	cleanup();
});
