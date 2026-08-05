<script lang="ts">
    import {ButtonClick} from "$lib";
    import {goto} from "$app/navigation";

    function f() {
        goto("/login");
    }

</script>

<div class="content-center">
<h1>Bem Vindo</h1>
<h2> Pressione o botão abaixo para acessar a página de login</h2>
<ButtonClick nome="Fazer Login" type="button" action = {f}></ButtonClick>

</div>