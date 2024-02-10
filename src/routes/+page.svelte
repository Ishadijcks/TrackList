<script lang="ts">
    import TrackBanner from '$lib/components/TrackBanner.svelte';
    import { client } from '$lib/SpotifyClient';
    import type { SpotifyTrack } from '$lib/models/SpotifyTrack';
    import { onMount } from 'svelte';
    import { formatArtists, formatName, msToMMSS } from '$lib/util/spotify';
    import StationClock from '$lib/components/StationClock.svelte';

    let tracks: SpotifyTrack[] = [];
    onMount(async () => {
        const queueData = await $client.getQueueData();

        if (queueData.queue) {
            tracks = [queueData.currently_playing, ...queueData.queue];
            tracks = tracks.splice(0, 8);
        }

        console.log(queueData);
        console.log('Retrieved tracks');
    });

    const timeThatSongStarts = (index: number): string => {
        let now = Date.now();

        for (let i = 0; i < index; i++) {
            now += tracks[i].duration_ms;
        }
        const newDate = new Date(now);
        const HH = newDate.getHours().toString().padStart(2, '0');
        const MM = newDate.getMinutes().toString().padStart(2, '0');
        return `${HH}:${MM}`;
    };
</script>

<table>
    <thead>
    <tr class="bg-blue-100">
        <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="ml-2">Start</span></th>
        <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">Track</span></th>
        <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">Index</span></th>
        <th class="bg-blue-900 w-48">
            <StationClock />
        </th>
    </tr>
    </thead>
    <tbody>
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
