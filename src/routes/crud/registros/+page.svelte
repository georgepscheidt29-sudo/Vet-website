<script lang="ts">
    import type {Registro, RegistroList, RegistroRequest, FieldConfig, ColumnConfig, SelectOption} from "$lib/api/types";
    import CreateButton from "$lib/components/CreateButton.svelte";
    import EditModal from "$lib/components/EditModal.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import {Endpoints} from "$lib/api/endpoints";
    import {request} from "$lib/api/http";
    import {HTTP_METHODS} from "$lib/api/enums";

    const { data } = $props();

    let registroList: RegistroList = $state(data?.data?.registroRespostaList || []);

    let editOpen = $state(false);
    let editing: Registro | null = $state(null);
    let editValues: Record<string, string> = $state({});

    const petOptions: SelectOption[] = (data?.pets?.petRespostaList ?? []).map(
        (pet: { id: number; petNome: string }) => ({ label: pet.petNome, value: String(pet.id) })
    );
    const vetOptions: SelectOption[] = (data?.vets?.vetRespostaList ?? []).map(
        (vet: { id: number; nome: string }) => ({ label: vet.nome, value: String(vet.id) })
    );
    const vacinaOptions: SelectOption[] = (data?.vacinas?.vacinaRespostaList ?? []).map(
        (vacina: { id: number; nome: string }) => ({ label: vacina.nome, value: String(vacina.id) })
    );

    const registroFields: FieldConfig<RegistroRequest>[] = [
        { key: "pet_id", label: "Pet", placeholder: "Selecione o Pet", options: petOptions },
        { key: "vet_id", label: "Veterinario", placeholder: "Selecione o Veterinario", options: vetOptions },
        { key: "vacina_id", label: "Vacina", placeholder: "Selecione a Vacina", options: vacinaOptions },
    ];

    const registroColumns: ColumnConfig<Registro>[] = [
        { key: "petNome", label: "Pet", emptyText: "Nenhum Pet Registrado" },
        { key: "vetNome", label: "Veterinario", emptyText: "Nenhum Veterinario Registrado" },
        { key: "vacNome", label: "Vacina", emptyText: "Nenhuma Vacina Registrada" },
    ];

    function handleCreated(created: Registro) {
        registroList = [...registroList, created];
    }

    function openEdit(row: Registro) {
        editing = row;
        editValues = {
            pet_id: row.petId != null ? String(row.petId) : "",
            vet_id: row.vetId != null ? String(row.vetId) : "",
            vacina_id: row.vacinaId != null ? String(row.vacinaId) : "",
        };
        editOpen = true;
    }

    async function submitEdit(values: Record<string, string>) {
        if (!editing) return;

        const url = `${Endpoints.backend}${Endpoints.registroUpdate(editing.id)}`;

        try {
            const updated: Registro = await request(url, HTTP_METHODS.PUT, JSON.stringify(values));
            if (updated) {
                registroList = registroList.map((r) => (r.id === editing!.id ? updated : r));
            }
            editOpen = false;
            editing = null;
        } catch (error) {
            console.error("Failed to update record:", error);
        }
    }

    async function handleDelete(row: Registro) {
        if (!confirm("Excluir este registro?")) return;

        const url = `${Endpoints.backend}${Endpoints.registroDelete(row.id)}`;

        try {
            await request(url, HTTP_METHODS.DELETE);
            registroList = registroList.filter((r) => r.id !== row.id);
        } catch (error) {
            console.error("Failed to delete record:", error);
        }
    }
</script>

<svelte:head>
    <title>Registros</title>
</svelte:head>

<div class="container">
    <h1 class="header">Registros</h1>

    <div class="toolbar">
        <CreateButton
                url={Endpoints.registroCreate}
                fields={registroFields}
                title="Criar Registro"
                buttonLabel="Criar"
                onCreated={handleCreated}
        />
    </div>

    <DataTable
            items={registroList}
            columns={registroColumns}
            emptyMessage="Nenhum Registro Encontrado"
            onEdit={openEdit}
            onDelete={handleDelete}
    />
</div>

<EditModal
        open={editOpen}
        title="Editar Registro"
        fields={registroFields}
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
