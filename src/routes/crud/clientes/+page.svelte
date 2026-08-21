<script lang="ts">
    import type {DonoList, DonoRequest, FieldConfig, ColumnConfig, Dono} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import EditModal from "$lib/components/EditModal.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import {Endpoints} from "$lib/api/endpoints";
    import {request} from "$lib/api/http";
    import {HTTP_METHODS} from "$lib/api/enums";

    const { data } = $props();

    let donoList: DonoList = $state(data?.data?.donoRespostaList || []);

    let editOpen = $state(false);
    let editing: Dono | null = $state(null);
    let editValues: Record<string, string> = $state({});

    const donoFields: FieldConfig<DonoRequest>[] = [
        { key: "nome", label: "Nome" },
        { key: "cpf", label: "CPF" },
        { key: "email", label: "Email", type: "email" },
    ];

    const donoEditFields: FieldConfig<Dono>[] = [
        { key: "nome", label: "Nome" },
        { key: "email", label: "Email", type: "email" },
    ];

    const donoColumns: ColumnConfig<Dono>[] = [
        { key: "nome", label: "Nome", emptyText: "Nenhum Nome Registrado" },
        { key: "email", label: "Email", emptyText: "Nenhum Email Registrado" },
        {
            key: "pets",
            label: "Pets",
            emptyText: "Nenhum Pet Registrado",
            format: (value) => (value as string[]).join(", "),
        },
    ];

    function handleCreated(created: Dono) {
        donoList = [...donoList, created];
    }

    function openEdit(row: Dono) {
        editing = row;
        editValues = { nome: row.nome ?? "", email: row.email ?? "" };
        editOpen = true;
    }

    async function submitEdit(values: Record<string, string>) {
        if (!editing) return;

        const url = `${Endpoints.backend}${Endpoints.donoUpdate(editing.id)}`;

        try {
            const updated: Dono = await request(url, HTTP_METHODS.PUT, JSON.stringify(values));
            if (updated) {
                donoList = donoList.map((d) => (d.id === editing!.id ? updated : d));
            }
            editOpen = false;
            editing = null;
        } catch (error) {
            console.error("Failed to update owner:", error);
        }
    }

    async function handleDelete(row: Dono) {
        if (!confirm(`Excluir o cliente "${row.nome}"?`)) return;

        const url = `${Endpoints.backend}${Endpoints.donoDelete(row.id)}`;

        try {
            await request(url, HTTP_METHODS.DELETE);
            donoList = donoList.filter((d) => d.id !== row.id);
        } catch (error) {
            console.error("Failed to delete owner:", error);
        }
    }
</script>

<svelte:head>
    <title>Clientes</title>
</svelte:head>

<div class="container">
    <h1 class="header">Clientes</h1>

    <div class="toolbar">
        <CreateButton
                url={Endpoints.donoCreate}
                fields={donoFields}
                title="Criar Dono"
                buttonLabel="Criar"
                onCreated={handleCreated}
        />
    </div>

    <DataTable
            items={donoList}
            columns={donoColumns}
            emptyMessage="Nenhum Cliente Encontrado"
            onEdit={openEdit}
            onDelete={handleDelete}
    />
</div>

<EditModal
        open={editOpen}
        title="Editar Cliente"
        fields={donoEditFields}
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
