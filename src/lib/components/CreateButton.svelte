<script lang="ts">
    import {request} from "$lib/api/http";
    import {Endpoints} from "$lib/api/endpoints";
    import {HTTP_METHODS} from "$lib/api/enums";
    import type {DonoRequest} from "$lib/api/types";

    let { url } = $props();

    let nome = $state('');
    let cpf = $state('');
    let email = $state('');
    let showModal = $state(false);

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    async function create(nome: string, cpf: string, email: string){
        let donoRequest: DonoRequest = {
            nome: nome,
            cpf: cpf,
            email: email,
        }

        let resolvedUrl = `${Endpoints.backend}${url}`

        try {
            await request(resolvedUrl, HTTP_METHODS.POST, JSON.stringify(donoRequest));
            closeModal();
            nome = '';
            cpf = '';
            email = '';
        } catch (error) {
            console.error('Failed to create dono:', error);
        }
    }
</script>

<button class="create-button" onclick={openModal}>
    Criar
</button>

{#if showModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="overlay" onclick={closeModal}>
        <div class="modal" onclick={(e) => e.stopPropagation()}>
            <h2>Criar Dono</h2>

            <input type="text" placeholder="Nome" bind:value={nome} />
            <input type="text" placeholder="CPF" bind:value={cpf} />
            <input type="email" placeholder="Email" bind:value={email} />

            <div class="modal-actions">
                <button class="cancel-button" onclick={closeModal}>Cancelar</button>
                <button class="confirm-button" onclick={() => create(nome, cpf, email)}>Confirmar</button>
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

    .modal input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
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