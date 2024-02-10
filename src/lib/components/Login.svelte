<script lang="ts">
    import { client } from '$lib/SpotifyClient';

    const authorize = async () => {
        window.location.href = await $client.authorize();
    };
</script>

<div class="flex flex-row w-full h-full justify-center items-center">
    <div class="w-1/2 h-1/2 bg-blue-200 flex flex-col items-center p-4 justify-between">
        <span class="font-nssans text-blue-900 text-4xl"
            >Please allow this application to access your Spotify Queue</span
        >
        <button on:click={authorize} class="font-nssans font-bold text-blue-900">Authorize</button>
    </div>
</div>
