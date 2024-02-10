<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let now = new Date();

    // these automatically update when `time`
    // changes, because of the `$:` prefix
    $: hours = now.getHours().toString().padStart(2, '0');
    $: minutes = now.getMinutes().toString().padStart(2, '0');

    const intervalMs = 1000;

    let lastTime = Date.now();

    onMount(() => {
        const interval = setInterval(() => {
            // Creatief boekhouden waar zelfs Wouter Koolmees trots op kan zijn
            now = new Date();
            const delta = now.getTime() - lastTime;
            lastTime = now.getTime();

            dispatch('tick', { duration: delta });
        }, intervalMs);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="flex flex-row items-center justify-center">
    <span class="text-white font-nssans font-bold text-2xl">{hours}:{minutes}</span>
</div>
