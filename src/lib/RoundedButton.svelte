<script lang="ts">
    let { nome, type, action, height = "5rem", width = "10rem", fontSize = "1.5rem" } = $props();
</script>

<div>
    <!-- svelte-ignore event_directive_deprecated -->
    <button
            class="roundedButton"
            style="height: {height}; width: {width}; font-size: {fontSize}"
            type={type}
            on:click={action}
    >
        {nome}
    </button>
</div>

<style>
    .roundedButton {
        display: flex;
        margin: 1rem;
        border-radius: 30px;
        align-items: center;
        justify-content: center;
        color: white;
        transition: background-color 0.2s;
    }

    .roundedButton:hover {
        background-color: #357abd;
    }
</style>