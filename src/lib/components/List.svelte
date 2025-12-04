<script lang="ts">

	import type { ShoppingList } from '$lib/models/list';
	import ListItem from './ListItem.svelte';

let { lists = $bindable() } = $props<{ lists: ShoppingList[] }>();

</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
	{#each lists as list (list.id)}
		<ListItem list={list as ShoppingList} />
	{/each}
</div>
