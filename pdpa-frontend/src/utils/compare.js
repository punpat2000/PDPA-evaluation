export function compare(a, b) {
	if (b.labels[0] === 'none' && a.labels[0] !== 'none') {
		return -1;
	}
	if (a.labels.length < b.labels.length) {
		return 1;
	}
	if (a.labels.length > b.labels.length) {
		return -1;
	}
	return 0;
}
