<script>
	import { Input, Header, List } from '$lib/components';
	import { initialLists } from '$lib/data/lists';

	let {lists = $bindable(initialLists)} = $props(); 
</script>

<Header>
	<h1 class="text-4xl font-bold">Shopping List</h1>
	<Input
    bind:lists={lists}
		className="text-center self-center py-4"
		placeholder="Dodaj listę"
	/>
</Header>

<List bind:lists={lists} />
