<script lang="ts">
    import type {DonoList, Vet} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import {Endpoints} from "$lib/api/endpoints";

    const { data } = $props();

    const donoList: DonoList = data?.data?.vetRespostaList || [];
</script>

<svelte:head>
    <title>Clientes</title>
</svelte:head>

<div class="container">
    <CreateButton url={Endpoints.donoCreate}></CreateButton>
    <h1 class="header">Clientes</h1>

    {#if donoList.length === 0}
        <h2 class="h2">Nenhum Cliente Encontrado</h2>
    {:else}
        <div class="table-wrapper">
            <table class="vet-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {#each donoList as dono}
                    <tr>
                        <td>{dono.nome || 'Nenhum Nome Registrado'}</td>
                        <td>{dono.email || 'Nenhum email registrado'}</td>
                        <td>{dono.pets || 'Nenhum Pet Registrado'}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .h2 {
        display: flex;
        text-align: center;
        justify-content: center;
        padding: 2rem;
        background: #fff;
    }

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