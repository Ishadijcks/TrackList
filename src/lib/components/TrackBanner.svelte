<script lang="ts">
    export let time: string;
    export let title: string;
    export let subtitle: string;
    export let platform: string;
    export let type: string;

    export let isEven: boolean = false;

    $: bgColor = isEven ? 'bg-blue-100' : 'bg-white';
</script>

<tr class="h-32 {bgColor}">
    <td>
        <span class="font-nssans font-bold text-blue-900 text-4xl ml-2">{time}</span>
    </td>
    <td>
        <div class="flex flex-col">
            <span class="font-nssans font-bold text-blue-900 text-4xl">{title}</span>
            <span class="font-nssans font-bold text-blue-900 text-xl">{subtitle}</span>
        </div>
    </td>
    <td>
        <div class="h-24 w-24 border-blue-900 border-4 flex flex-row items-center justify-center relative">
            <span class="absolute h-6 w-6 bg-blue-900 left-0 top-0"> </span>
            <span class="font-nssans font-bold text-blue-900 text-4xl">{platform}</span>
        </div>
    </td>
    <td>
        <div class="font-nssans font-bold text-blue-900 text-4xl">{type}</div>
    </td>
</tr>
