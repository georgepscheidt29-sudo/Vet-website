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

    <form id="loginForm" onsubmit={handleSubmit}>
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

        <button type="submit">
            Login
        </button>
    </form>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        font-family: "Goudy Old Style",system-ui;
    }
    h1 {
        font-size: 60px;
    }
    p {
        font-size: 25px;
    }
</style>