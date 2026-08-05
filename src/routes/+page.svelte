<script lang="ts">
    import {ButtonClick} from "$lib";
    import {goto} from "$app/navigation";

    function f() {
        goto("/login");
    }

</script>

<div class="container">

    <h1 class="header1">Bem Vindo</h1>
    <h2 class="header2"> Pressione o botão abaixo para acessar a página de login</h2>
    <ButtonClick nome="Fazer Login" type="button" action = {f}></ButtonClick>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;

        gap: 5rem;
    }

    .header1 {
        min-height: 10vh;
    }

</style>
