<script lang="ts">
    import { RoundedButton } from "$lib";
    import { goto } from "$app/navigation";

    async function handleNavigation(path: string) {
        try {
            await goto(`/crud/${path}`);
        } catch (error) {
            console.error("Navigation failed:", error);
        }
    }
</script>

<svelte:head>
    <title>Menu</title>
</svelte:head>

<h1 class="header1">
    Sistema de Controle Para Veterinaria
</h1>

<div class="menu">
    <RoundedButton
            nome="Veterinarios"
            type="button"
            action={() => handleNavigation('vets')}
            height="3rem"
            fontSize="1rem"
    />
    <RoundedButton
            nome="Clientes"
            type="button"
            action={() => handleNavigation('clientes')}
            height="3rem"
            fontSize="1rem"
    />
    <RoundedButton
            nome="Pets"
            type="button"
            action={() => handleNavigation('pets')}
            height="3rem"
            fontSize="1rem"
    />
    <RoundedButton
            nome="Vacinas"
            type="button"
            action={() => handleNavigation('vacinas')}
            height="3rem"
            fontSize="1rem"
    />
    <RoundedButton
            nome="Registros"
            type="button"
            action={() => handleNavigation('registros')}
            height="3rem"
            fontSize="1rem"
    />
</div>

<style>
    .header1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        min-height: 10rem;
    }

    .menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
</style>