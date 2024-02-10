<script lang="ts">
    import Dashboard from '$lib/components/Dashboard.svelte';
    import Login from '$lib/components/Login.svelte';
    import { isAuthenticated } from '$lib/util/authentication';
</script>

{#if $isAuthenticated}
    <Dashboard />
{:else}
    <Login />
{/if}
