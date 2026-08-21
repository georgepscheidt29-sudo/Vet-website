<script lang="ts">
    import {resolve} from "$app/paths";
    import {goto} from "$app/navigation";

    function handleNavigate(){
        let resolvedPath = resolve("/menu")
        goto(resolvedPath);
    }
</script>

<div class="button-wrapper">
    <button class="button" onclick={handleNavigate}>Voltar ao Menu</button>
</div>

<style>
    .button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin: 1rem;
    }

    .button {
        padding: 0.5rem 1rem;
        background-color: lightblue;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
</style>