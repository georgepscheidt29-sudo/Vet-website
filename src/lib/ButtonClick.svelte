<script lang="ts">
    let { nome, type, action } = $props();
</script>

<div>
    <button class="buttonClick" type = {type} onclick = {action}>
        {nome}
    </button>
</div>

<style>
    .buttonClick {
        display: flex;
        margin: 1rem;
    }
</style>