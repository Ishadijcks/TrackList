<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let time = new Date();

    // these automatically update when `time`
    // changes, because of the `$:` prefix
    $: hours = time.getHours().toString().padStart(2, '0');
    $: minutes = time.getMinutes().toString().padStart(2, '0');

    const intervalMs = 1000;
    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
            dispatch('tick', { duration: intervalMs });
        }, intervalMs);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="flex flex-row items-center justify-center">
    <span class="text-white font-nssans font-bold text-2xl">{hours}:{minutes}</span>
</div>
