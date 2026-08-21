<script>
    import ExitButton from "$lib/components/ExitButton.svelte";

    let { children } = $props();
</script>

<ExitButton />
{@render children()}