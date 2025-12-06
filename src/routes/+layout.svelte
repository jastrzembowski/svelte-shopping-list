<script lang="ts">
	import './layout.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav } from '$lib/components';
	
	let { children } = $props();

	let isDarkMode = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('isDarkMode') !== null
			? localStorage.getItem('isDarkMode') === 'true'
			: false
	);


 let setDarkMode = (mode: boolean) => {
	isDarkMode = mode;
	localStorage.setItem('isDarkMode', mode.toString());
	// Dispatch custom event for same-tab updates
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new Event('darkModeChange'));
	}
 }

	$effect(() => {
		localStorage.setItem('isDarkMode', isDarkMode.toString() || 'false');
	});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav isDarkMode={isDarkMode} setDarkMode={setDarkMode} />

{@render children()}
