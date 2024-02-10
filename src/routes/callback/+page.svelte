<script lang="ts">
    import { client } from '$lib/SpotifyClient';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code') as string;

        const token = await $client.getToken(code);
        localStorage.setItem('access_token', token);

        await goto(`${base}/`);
    });
</script>
