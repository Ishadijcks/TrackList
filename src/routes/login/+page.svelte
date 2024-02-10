<script lang="ts">
    import { client } from '$lib/SpotifyClient';

    const authorize = async () => {
        const authUrl = await $client.authorize();
        // console.log(authUrl);
        window.location.href = authUrl;
    };
</script>

<div class="flex flex-row w-full h-full justify-center items-center">
    <div class="w-96 h-36 bg-blue-200 flex flex-col items-center p-4 justify-between">
        <span class="font-nssans text-blue-900">Please allow this application to access your Spotify Queue</span>
        <button on:click={authorize} class="font-nssans font-bold text-blue-900">Authorize</button>
    </div>
</div>
