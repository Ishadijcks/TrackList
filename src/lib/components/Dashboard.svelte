<script lang="ts">
    import TrackBanner from '$lib/components/TrackBanner.svelte';
    import { client } from '$lib/SpotifyClient';
    import type { SpotifyTrack } from '$lib/models/SpotifyTrack';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { formatArtists, formatName } from '$lib/util/spotify';
    import StationClock from '$lib/components/StationClock.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { isAuthenticated } from '$lib/util/authentication';

    let tracks: SpotifyTrack[] = [];

    $: currentLength = tracks?.[0]?.duration_ms ?? Infinity;
    let currentProgress: number = 0;
    $: progressPercentage = (currentProgress / currentLength) * 100;

    async function getData() {
        const queueData = await $client.getQueueData();
        const currentPlayer = await $client.getCurrentPlayer();

        currentProgress = currentPlayer.progress_ms;
        if (queueData.queue) {
            tracks = [queueData.currently_playing, ...queueData.queue];
            console.log('Retrieved tracks');
        } else {
            localStorage.removeItem('code_verifier');
            localStorage.removeItem('access_token');
            $isAuthenticated = false;

            console.log('Error while fetching data, clearing localstorage');
            await goto(`${base}/`);
        }
    }

    onMount(() => {
        getData();
    });

    const clockTick = async (e) => {
        const delta = e.detail.duration;
        currentProgress += delta;

        if (progressPercentage > 100) {
            await getData();
        }
    };

    $: timeThatSongStarts = (index: number): string => {
        let now = Date.now() - currentProgress;

        for (let i = 0; i < index; i++) {
            now += tracks[i].duration_ms;
        }
        const newDate = new Date(now);
        const HH = newDate.getHours().toString().padStart(2, '0');
        const MM = newDate.getMinutes().toString().padStart(2, '0');
        return `${HH}:${MM}`;
    };
</script>

{#if tracks.length}
    <table>
        <thead>
            <tr class="bg-blue-100">
                <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="ml-2">Vertrek</span></th>
                <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">Track</span></th>
                <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">Spoor</span></th>
                <th class="bg-blue-900 w-48">
                    <StationClock on:tick={clockTick} />
                </th>
            </tr>
        </thead>
        <tbody class="overflow-y-scroll">
            {#each tracks as track, index}
                <TrackBanner
                    time={timeThatSongStarts(index)}
                    title={formatName(track.name)}
                    subtitle={formatArtists(track.artists)}
                    platform={track.track_number}
                    album={formatName(track.album.name)}
                    iconUrl={track.album.images[0].url}
                    isEven={index % 2 === 0}
                ></TrackBanner>
            {/each}
        </tbody>
    </table>

    <div class="sticky left-0 bottom-0 flex flex-row">
        <progress class="w-full h-1" value={progressPercentage} max={100} />
    </div>
{:else}
    <div class="flex flex-row justify-center items-center w-full h-full">
        <div class="flex flex-col items-center space-y-4">
            <LoadingSpinner />
            <span class="text-4xl font-nssans font-bold text-blue-900">
                Zorg dat je spotify aanstaat en probeer het opnieuw...
            </span>
        </div>
    </div>
{/if}

<style>
    progress::-moz-progress-bar {
        background: rgb(30, 58, 138);
    }

    progress::-webkit-progress-value {
        background: rgb(30, 58, 138);
    }

    progress {
        color: rgb(30, 58, 138);
    }
</style>
