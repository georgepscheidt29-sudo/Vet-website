<script lang="ts" generics="T extends Record<string, unknown>">
    import type { ColumnConfig } from "$lib/api/types";

    let {
        items,
        columns,
        emptyMessage = "Nenhum Registro Encontrado",
        onEdit,
        onDelete,
    }: {
        items: T[];
        columns: ColumnConfig<T>[];
        emptyMessage?: string;
        onEdit?: (row: T) => void;
        onDelete?: (row: T) => void;
    } = $props();

    const hasActions = $derived(Boolean(onEdit || onDelete));

    function displayValue(row: T, col: ColumnConfig<T>): string {
        const raw = row[col.key];

        if (raw === undefined || raw === null || raw === "") {
            return col.emptyText ?? "";
        }

        if (col.format) {
            return col.format(raw as T[keyof T & string], row);
        }

        return String(raw);
    }
</script>

{#if items.length === 0}
    <h2 class="h2">{emptyMessage}</h2>
{:else}
    <div class="table-wrapper">
        <table class="data-table">
            <thead>
            <tr>
                {#each columns as col (col.key)}
                    <th>{col.label}</th>
                {/each}
                {#if hasActions}
                    <th>Ações</th>
                {/if}
            </tr>
            </thead>
            <tbody>
            {#each items as row}
                <tr>
                    {#each columns as col (col.key)}
                        <td>{displayValue(row, col)}</td>
                    {/each}
                    {#if hasActions}
                        <td class="actions">
                            {#if onEdit}
                                <button class="edit-button" onclick={() => onEdit?.(row)}>Editar</button>
                            {/if}
                            {#if onDelete}
                                <button class="delete-button" onclick={() => onDelete?.(row)}>Excluir</button>
                            {/if}
                        </td>
                    {/if}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}

<style>
    .h2 {
        display: flex;
        text-align: center;
        justify-content: center;
        padding: 2rem;
        background: #fff;
    }

    .table-wrapper {
        display: flex;
        justify-content: center;
    }

    .data-table {
        width: 60%;
        max-width: 700px;
        border-collapse: collapse;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        overflow: hidden;
    }

    .data-table th,
    .data-table td {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #e0e0e0;
        color: #333333;
    }

    .data-table thead {
        background-color: #f0f0f0;
    }

    .data-table th {
        color: #555555;
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .data-table tbody tr:hover {
        background-color: #fafafa;
    }

    .data-table tbody tr:last-child td {
        border-bottom: none;
    }

    .actions {
        display: flex;
        gap: 0.5rem;
    }

    .edit-button,
    .delete-button {
        padding: 0.35rem 0.75rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
    }

    .edit-button {
        background-color: #7b93ab;
        color: #000;
    }

    .edit-button:hover {
        background-color: #6a80a1;
    }

    .delete-button {
        background-color: #c96a6a;
        color: #000;
    }

    .delete-button:hover {
        background-color: #b25656;
    }
</style>