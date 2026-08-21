<script lang="ts">
    import type {Pet, PetList, PetRequest, FieldConfig, ColumnConfig, SelectOption} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import EditModal from "$lib/components/EditModal.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import {Endpoints} from "$lib/api/endpoints";
    import {request} from "$lib/api/http";
    import {HTTP_METHODS} from "$lib/api/enums";

    const { data } = $props();

    let petList: PetList = $state(data?.data?.petRespostaList || []);

    let editOpen = $state(false);
    let editing: Pet | null = $state(null);
    let editValues: Record<string, string> = $state({});

    const donoOptions: SelectOption[] = (data?.donos?.donoRespostaList ?? []).map(
        (dono: { id: number; nome: string }) => ({ label: dono.nome, value: String(dono.id) })
    );

    const petFields: FieldConfig<PetRequest>[] = [
        { key: "nome", label: "Nome" },
        { key: "raca", label: "Raça" },
        { key: "donoId", label: "Dono", placeholder: "Selecione o Dono", options: donoOptions },
    ];

    const petColumns: ColumnConfig<Pet>[] = [
        { key: "petNome", label: "Nome", emptyText: "Nenhum Nome Registrado" },
        { key: "donoNome", label: "Dono", emptyText: "Nenhum Dono Registrado" },
        { key: "raca", label: "Raça", emptyText: "Nenhuma Raça Registrada" },
        {
            key: "vacinaList",
            label: "Vacinas",
            emptyText: "Nenhuma Vacina Registrada",
            format: (value) => (value as string[]).join(", "),
        },
    ];

    function handleCreated(created: Pet) {
        petList = [...petList, created];
    }

    function openEdit(row: Pet) {
        editing = row;
        editValues = {
            nome: row.petNome ?? "",
            raca: row.raca ?? "",
            donoId: row.donoId != null ? String(row.donoId) : "",
        };
        editOpen = true;
    }

    async function submitEdit(values: Record<string, string>) {
        if (!editing) return;

        const url = `${Endpoints.backend}${Endpoints.petUpdate(editing.id)}`;

        try {
            const updated: Pet = await request(url, HTTP_METHODS.PUT, JSON.stringify(values));
            if (updated) {
                petList = petList.map((p) => (p.id === editing!.id ? updated : p));
            }
            editOpen = false;
            editing = null;
        } catch (error) {
            console.error("Failed to update pet:", error);
        }
    }

    async function handleDelete(row: Pet) {
        if (!confirm(`Excluir o pet "${row.petNome}"?`)) return;

        const url = `${Endpoints.backend}${Endpoints.petDelete(row.id)}`;

        try {
            await request(url, HTTP_METHODS.DELETE);
            petList = petList.filter((p) => p.id !== row.id);
        } catch (error) {
            console.error("Failed to delete pet:", error);
        }
    }
</script>

<svelte:head>
    <title>Pets</title>
</svelte:head>

<div class="container">
    <h1 class="header">Pets</h1>

    <div class="toolbar">
        <CreateButton
                url={Endpoints.petCreate}
                fields={petFields}
                title="Criar Pet"
                buttonLabel="Criar"
                onCreated={handleCreated}
        />
    </div>

    <DataTable
            items={petList}
            columns={petColumns}
            emptyMessage="Nenhum Pet Encontrado"
            onEdit={openEdit}
            onDelete={handleDelete}
    />
</div>

<EditModal
        open={editOpen}
        title="Editar Pet"
        fields={petFields}
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
