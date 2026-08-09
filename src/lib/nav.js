// Single source of truth for in-page section anchors. The header nav, the mobile
// drawer and the footer sitemap all read from this list, so adding a section means
// touching one array instead of three components drifting out of sync.
// Order mirrors the section order in src/routes/+page.svelte.
export const navLinks = [
	{ label: 'IDENTITY', href: '#about' },
	{ label: 'MANIFESTO', href: '#manifesto' },
	{ label: 'BLUEPRINT', href: '#blueprint' },
	{ label: 'SERVICES', href: '#services' },
	{ label: 'CREED', href: '#creed' },
	{ label: 'LEDGER', href: '#ledger' },
	{ label: 'CONTACT', href: '#contact' }
];

/** Zero-padded index for the `// 01.` sitemap notation. */
export const navIndex = (/** @type {number} */ i) => String(i + 1).padStart(2, '0');
