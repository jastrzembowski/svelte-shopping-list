<script lang="ts">
    let { isDarkMode = $bindable(), setDarkMode = $bindable() } = $props<{ isDarkMode: boolean, setDarkMode: (mode: boolean) => void }>();
</script>

<nav class="flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 {isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}">

    <div>
        <a href="/" class="text-2xl font-bold {isDarkMode ? 'text-white' : 'text-black'}">Shopping List</a>
    </div>
<div>
    <button onclick={() => setDarkMode(false)} class="text-2xl cursor-pointer p-2">
        ☀️
    </button>
    <button onclick={() => setDarkMode(true)} class="text-2xl cursor-pointer p-2">
        🌙
    </button>
</div>
</nav>