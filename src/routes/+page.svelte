<script lang="ts">
	import { onMount } from 'svelte';
	import { Input, Header, Board } from '$lib/components';
	import type { List } from '$lib/models';
	import { getLists } from '$lib/utils';

	let lists: List[] = $state([]);

	let loading = $state(true);

	let isDarkMode = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('isDarkMode') !== null
			? localStorage.getItem('isDarkMode') === 'true'
			: false
	);

const fetchLists = async () => {
	loading = true;
	const data = await getLists();
	lists = data;
	loading = false;
}


	onMount(() => {
		fetchLists();

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'isDarkMode') {
				isDarkMode = e.newValue === 'true';
			}
		};

		window.addEventListener('storage', handleStorageChange);

		const handleCustomStorage = () => {
			if (typeof localStorage !== 'undefined') {
				isDarkMode = localStorage.getItem('isDarkMode') === 'true';
			}
		};

		window.addEventListener('darkModeChange', handleCustomStorage);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('darkModeChange', handleCustomStorage);
		};
	});


</script>

<div class="h-screen">
<Header>
	<h1 class="text-4xl font-bold">Shopping List</h1>
	<Input
		bind:lists={lists}
		className="text-center self-center py-4"
		placeholder="Dodaj listę"
		fetchLists={fetchLists}
	/>
</Header>

{#if loading}
	<div class="flex justify-center items-center h-scree {isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}">
		<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
	</div>
{:else}
	
	<Board isDarkMode={isDarkMode} bind:lists={lists} fetchLists={fetchLists} />
{/if}
</div>