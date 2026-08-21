<script lang="ts">
    import type {Vet, VetRequest, FieldConfig, ColumnConfig} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import EditModal from "$lib/components/EditModal.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import {Endpoints} from "$lib/api/endpoints";
    import {request} from "$lib/api/http";
    import {HTTP_METHODS} from "$lib/api/enums";

    const { data } = $props();

    let vetList: Vet[] = $state(data?.data?.vetRespostaList || []);

    let editOpen = $state(false);
    let editing: Vet | null = $state(null);
    let editValues: Record<string, string> = $state({});

    const vetFields: FieldConfig<VetRequest>[] = [
        { key: "nome", label: "Nome" },
        { key: "email", label: "Email", type: "email" },
        { key: "senha", label: "Senha", type: "password" },
    ];

    const vetEditFields: FieldConfig<Vet>[] = [
        { key: "nome", label: "Nome" },
        { key: "email", label: "Email", type: "email" },
    ];

    const vetColumns: ColumnConfig<Vet>[] = [
        { key: "nome", label: "Nome", emptyText: "No Name" },
        { key: "email", label: "Email", emptyText: "No Email" },
    ];

    function handleCreated(created: Vet) {
        vetList = [...vetList, created];
    }

    function openEdit(row: Vet) {
        editing = row;
        editValues = { nome: row.nome ?? "", email: row.email ?? "" };
        editOpen = true;
    }

    async function submitEdit(values: Record<string, string>) {
        if (!editing) return;

        const url = `${Endpoints.backend}${Endpoints.vetUpdate(editing.id)}`;

        try {
            const updated: Vet = await request(url, HTTP_METHODS.PUT, JSON.stringify(values));
            if (updated) {
                vetList = vetList.map((v) => (v.id === editing!.id ? updated : v));
            }
            editOpen = false;
            editing = null;
        } catch (error) {
            console.error("Failed to update vet:", error);
        }
    }

    async function handleDelete(row: Vet) {
        if (!confirm(`Excluir o veterinario "${row.nome}"?`)) return;

        const url = `${Endpoints.backend}${Endpoints.vetDelete(row.id)}`;

        try {
            await request(url, HTTP_METHODS.DELETE);
            vetList = vetList.filter((v) => v.id !== row.id);
        } catch (error) {
            console.error("Failed to delete vet:", error);
        }
    }
</script>

<svelte:head>
    <title>Veterinarios</title>
</svelte:head>

<div class="container">
    <h1 class="header">Veterinarios</h1>

    <div class="toolbar">
        <CreateButton
                url={Endpoints.vetCreate}
                fields={vetFields}
                title="Criar Veterinario"
                buttonLabel="Criar"
                onCreated={handleCreated}
        />
    </div>

    <DataTable
            items={vetList}
            columns={vetColumns}
            emptyMessage="Nenhum Veterinario Encontrado"
            onEdit={openEdit}
            onDelete={handleDelete}
    />
</div>

<EditModal
        open={editOpen}
        title="Editar Veterinario"
        fields={vetEditFields}
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
