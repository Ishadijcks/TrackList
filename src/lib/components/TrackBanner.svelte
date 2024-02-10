<script lang="ts">
    export let time: string;
    export let title: string;
    export let subtitle: string;
    export let platform: string;
    export let album: string;
    export let iconUrl: string;

    export let isEven: boolean = false;

    $: bgColor = isEven ? 'bg-white' : 'bg-blue-100';
</script>

<tr class="p-12 {bgColor}">
    <td>
        <span class="font-nssans font-bold text-blue-900 text-4xl ml-2">{time}</span>
    </td>
    <td>
        <div class="flex flex-col space-y-1">
            <span class="font-nssans font-bold text-blue-900 text-4xl">{title}</span>
            <span class="font-nssans font-bold text-blue-900 text-xl">{subtitle}</span>
        </div>
    </td>
    <td class="py-2">
        <div class="h-24 w-24 border-blue-900 border-4 flex flex-row items-center justify-center relative">
            <span class="absolute h-6 w-6 bg-blue-900 left-0 top-0"> </span>
            <span class="font-nssans font-bold text-blue-900 text-4xl">{platform}</span>
        </div>
    </td>
    <td>
        <div class="flex flex-col space-y-2 overflow-hidden">
            <img src={iconUrl} class="w-8 h-8 ns-filter" alt={title} />
            <p class="text-blue-900 text-xs font-nssans font-bold text-nowrap w-0">{album}</p>
        </div>
    </td>
</tr>

<style>
    .ns-filter {
        filter: sepia(100%) hue-rotate(180deg) saturate(200%);
    }
</style>
