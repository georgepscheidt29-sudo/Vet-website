<script lang="ts">
    import {ButtonClick} from "$lib";
    import { login } from "$lib/api/login";
    import { saveToken} from "$lib/api/login";


    async function handleSubmit(event: SubmitEvent) {

        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;

        const formData = new FormData(form);

        const email = formData.get("email") as string;
        const senha = formData.get("senha") as string;

        const data = await login(email, senha);

        const token = data.token;
        saveToken(token);

        console.log(data);
    }
</script>

<div class="container">
<h1>Login Page</h1>

    <form class="form" id="loginForm" onsubmit={handleSubmit}>
        <p>Insira seu email:</p>

        <input
                id="email"
                name="email"
                type="email"
                required
        >

        <p>Insira sua Senha:</p>

        <input
                id="senha"
                name="senha"
                type="password"
                required
        >

        <ButtonClick nome="Login" type="submit" action="handleSubmit"></ButtonClick>
    </form>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 50vh;
        gap: 1rem;
    }

    .form {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        background-color: dimgrey;
        border-radius: 10px;
        padding: 1.5rem;
    }
</style>