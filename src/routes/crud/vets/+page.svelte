<script lang="ts">
    import type { Vet } from "$lib/api/types";

    const { data } = $props();

    const vetList: Vet[] = data?.data?.vetRespostaList || [];
</script>

<svelte:head>
    <title>Vet List</title>
</svelte:head>

<div class="container">
    <h1 class="header">Veterinarios</h1>

    {#if vetList.length === 0}
        <p>Nenhum Veterinario Encontrado</p>
    {:else}
        <div class="table-wrapper">
            <table class="vet-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {#each vetList as vet}
                    <tr>
                        <td>{vet.nome || 'No Name'}</td>
                        <td>{vet.email || 'No Email'}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 20vh;
    }

    .table-wrapper {
        display: flex;
        justify-content: center;
    }

    .vet-table {
        width: 60%;
        max-width: 700px;
        border-collapse: collapse;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        overflow: hidden;
    }

    .vet-table th,
    .vet-table td {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #e0e0e0;
        color: #333333;
    }

    .vet-table thead {
        background-color: #f0f0f0;
    }

    .vet-table th {
        color: #555555;
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .vet-table tbody tr:hover {
        background-color: #fafafa;
    }

    .vet-table tbody tr:last-child td {
        border-bottom: none;
    }
</style>