<script lang="ts" generics="TRequest extends Record<string, unknown>">
    import type { FieldConfig } from "$lib/api/types";

    let {
        open = false,
        title = "Editar",
        fields,
        initialValues,
        onConfirm,
        onClose,
    }: {
        open?: boolean;
        title?: string;
        fields: FieldConfig<TRequest>[];
        initialValues: Record<string, string>;
        onConfirm: (values: Record<string, string>) => void | Promise<void>;
        onClose: () => void;
    } = $props();

    let values = $state<Record<string, string>>({});

    $effect(() => {
        if (open) {
            values = { ...initialValues };
        }
    });

    async function confirm() {
        await onConfirm({ ...values });
    }
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={onClose}>
        <div class="modal" onclick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>

            {#each fields as field (field.key)}
                {#if field.options}
                    <select bind:value={values[field.key]}>
                        <option value="" disabled>{field.placeholder ?? field.label}</option>
                        {#each field.options as option (option.value)}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                {:else}
                    <input
                            type={field.type ?? "text"}
                            placeholder={field.placeholder ?? field.label}
                            bind:value={values[field.key]}
                    />
                {/if}
            {/each}

            <div class="modal-actions">
                <button class="cancel-button" onclick={onClose}>Cancelar</button>
                <button class="confirm-button" onclick={confirm}>Salvar</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    .modal {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 300px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    .modal input,
    .modal select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #ffffff;
        color: #000000;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .cancel-button {
        padding: 0.5rem 1rem;
        background-color: #e0e0e0;
        color: #000;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .confirm-button {
        padding: 0.5rem 1rem;
        background-color: #7b93ab;
        color: #000;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
