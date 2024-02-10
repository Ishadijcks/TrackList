<script lang="ts">
    import TrackBanner from '$lib/components/TrackBanner.svelte';
</script>

<table>
    <thead>
        <tr class="h-8 bg-blue-100">
            <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="ml-2">Depart</span></th>
            <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">To/Remark</span></th>
            <th class="italic font-nssans font-bold text-blue-900 text-left"><span class="">Platform</span></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <TrackBanner
            time="10:04"
            title="Groningen"
            subtitle="Via Zwolle, Assen"
            platform="2"
            type="Intercity"
            isEven={false}
        ></TrackBanner>
        <TrackBanner
            time="10:09"
            title="Ede-Wageningen"
            subtitle="Via Hoevelaken, Barneveld Noord, Barneveld C"
            platform="4b"
            type="Intercity"
            isEven={true}
        ></TrackBanner>
        <TrackBanner time="10:10" title="Apeldoorn" subtitle="" platform="2" type="Intercity" isEven={false}
        ></TrackBanner>
        <TrackBanner
            time="10:10"
            title="Den Haag Centraal"
            subtitle="Via Utrecht C, Gouda"
            platform="4a"
            type="Intercity"
            isEven={true}
        ></TrackBanner>
        <TrackBanner
            time="10:11"
            title="Schiphol Airport"
            subtitle="Via Hilversum, Duivendrecht, Amsterdam Zuid"
            platform="5a"
            type="Intercity"
            isEven={false}
        ></TrackBanner>
    </tbody>
</table>
