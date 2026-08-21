<script lang="ts" generics="TRequest extends Record<string, unknown>, TResponse = TRequest">
    import { request } from "$lib/api/http";
    import { HTTP_METHODS } from "$lib/api/enums";
    import { Endpoints } from "$lib/api/endpoints";
    import type { FieldConfig } from "$lib/api/types";

    let {
        url,
        fields,
        title = "Criar",
        buttonLabel = "Criar",
        onCreated,
    }: {
        url: string;
        fields: FieldConfig<TRequest>[];
        title?: string;
        buttonLabel?: string;
        onCreated?: (created: TResponse) => void;
    } = $props();

    let showModal = $state(false);

    let values = $state<Record<string, string>>(
        Object.fromEntries(fields.map((f) => [f.key, ""]))
    );

    function openModal() {
        values = Object.fromEntries(fields.map((f) => [f.key, ""]));
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    async function create() {
        const payload = { ...values };
        const resolvedUrl = `${Endpoints.backend}${url}`;

        try {
            const created = await request(resolvedUrl, HTTP_METHODS.POST, JSON.stringify(payload));
            closeModal();

            if (created) {
                onCreated?.(created as TResponse);
            }
        } catch (error) {
            console.error("Failed to create:", error);
        }
    }
</script>

<button class="create-button" onclick={openModal}>
    {buttonLabel}
</button>

{#if showModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="overlay" onclick={closeModal}>
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
                <button class="cancel-button" onclick={closeModal}>Cancelar</button>
                <button class="confirm-button" onclick={create}>Confirmar</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .create-button {
        padding: 0.6rem 1.2rem;
        background-color: #7b93ab;
        color: #000000;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
    }

    .create-button:hover {
        background-color: #6a80a1;
    }

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