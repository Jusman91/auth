export function hslaColors(hue: string, alpha: string) {
	const colors: { [key: number | string]: string } = {};
	const alphaValue = alpha || '<alpha-value>';

	for (let i = 0; i <= 90; i += 10) {
		colors[
			`${hue}-${i}`
		] = `hsl(var(--color-${hue}-${i}) / ${alphaValue})`;
	}

	return colors;
}
