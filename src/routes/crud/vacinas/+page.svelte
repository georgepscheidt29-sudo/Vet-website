<script lang="ts">
    import type {Vacina, VacinaList, VacinaRequest, FieldConfig, ColumnConfig} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import EditModal from "$lib/components/EditModal.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import {Endpoints} from "$lib/api/endpoints";
    import {request} from "$lib/api/http";
    import {HTTP_METHODS} from "$lib/api/enums";

    const { data } = $props();

    let vacinaList: VacinaList = $state(data?.data?.vacinaRespostaList || []);

    let editOpen = $state(false);
    let editing: Vacina | null = $state(null);
    let editValues: Record<string, string> = $state({});

    const vacinaFields: FieldConfig<VacinaRequest>[] = [
        { key: "nome", label: "Nome" },
        { key: "virus", label: "Vírus" },
        { key: "metodo", label: "Método" },
    ];

    const vacinaColumns: ColumnConfig<Vacina>[] = [
        { key: "nome", label: "Nome", emptyText: "Nenhum Nome Registrado" },
        { key: "virus", label: "Vírus", emptyText: "Nenhum Vírus Registrado" },
        { key: "metodo", label: "Método", emptyText: "Nenhum Método Registrado" },
    ];

    function handleCreated(created: Vacina) {
        vacinaList = [...vacinaList, created];
    }

    function openEdit(row: Vacina) {
        editing = row;
        editValues = {
            nome: row.nome ?? "",
            virus: row.virus ?? "",
            metodo: row.metodo ?? "",
        };
        editOpen = true;
    }

    async function submitEdit(values: Record<string, string>) {
        if (!editing) return;

        const url = `${Endpoints.backend}${Endpoints.vacinaUpdate(editing.id)}`;

        try {
            const updated: Vacina = await request(url, HTTP_METHODS.PUT, JSON.stringify(values));
            if (updated) {
                vacinaList = vacinaList.map((v) => (v.id === editing!.id ? updated : v));
            }
            editOpen = false;
            editing = null;
        } catch (error) {
            console.error("Failed to update vaccine:", error);
        }
    }

    async function handleDelete(row: Vacina) {
        if (!confirm(`Excluir a vacina "${row.nome}"?`)) return;

        const url = `${Endpoints.backend}${Endpoints.vacinaDelete(row.id)}`;

        try {
            await request(url, HTTP_METHODS.DELETE);
            vacinaList = vacinaList.filter((v) => v.id !== row.id);
        } catch (error) {
            console.error("Failed to delete vaccine:", error);
        }
    }
</script>

<svelte:head>
    <title>Vacinas</title>
</svelte:head>

<div class="container">
    <h1 class="header">Vacinas</h1>

    <div class="toolbar">
        <CreateButton
                url={Endpoints.vacinaCreate}
                fields={vacinaFields}
                title="Criar Vacina"
                buttonLabel="Criar"
                onCreated={handleCreated}
        />
    </div>

    <DataTable
            items={vacinaList}
            columns={vacinaColumns}
            emptyMessage="Nenhuma Vacina Encontrada"
            onEdit={openEdit}
            onDelete={handleDelete}
    />
</div>

<EditModal
        open={editOpen}
        title="Editar Vacina"
        fields={vacinaFields}
        initialValues={editValues}
        onConfirm={submitEdit}
        onClose={() => { editOpen = false; editing = null; }}
/>

<style>
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 20vh;
    }

    .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 60%;
        max-width: 700px;
        margin: 0 auto 0.75rem auto;
    }
</style>
