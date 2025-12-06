<script lang="ts">

	import type { List } from '$lib/models/list';
	import ListItem from './ListItem.svelte';

	let { isDarkMode = $bindable() , lists = $bindable() , fetchLists = $bindable() } = $props<{ isDarkMode: boolean, lists: List[], fetchLists: () => void }>();

	$effect(() => {
		// Ensure component rerenders when isDarkMode changes
		isDarkMode;
	});


let sortedLists = $state(lists.sort((a: List, b: List) => {
		if (a.creationTimeStamp < b.creationTimeStamp) return 1;
		if (a.creationTimeStamp > b.creationTimeStamp) return -1;
		return 0;
	}));

	
</script>

<div class={`flex flex-wrap justify-center gap-4 p-4 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`} style="align-content: baseline;">
	{#each sortedLists as list (list.id)}
		<ListItem list={list} fetchLists={fetchLists} />
	{/each}
</div>
