<script lang="ts">

    import { goto } from '$app/navigation';

    let email = $state('');
    let senha = $state('');
    let errorMessage = $state('');

    export async function login() {
        errorMessage = '';

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                await goto('/entry');
            } else if (response.status === 401) {
                errorMessage = 'Credenciais Invalidas';
            } else if (response.status === 400) {
                errorMessage = 'Preencha todos os campos antes de enviar';
            } else {
                errorMessage = 'Algo deu errado, tente novamente mais tarde';
            }
        } catch (err) {
            errorMessage = 'Servidor indisponivel';
        }
    }
</script>

<div class="container">
<h1>Login Page</h1>

    <form class="form" onsubmit="{login}">
        <input type="email" bind:value={email} placeholder="Email" />
        <input type="password" bind:value={senha} placeholder="Senha" />
        <button type="submit">Log in</button>
    </form>

    {#if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        justify-content: center;
        align-items: center;
        height: 70vh;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        width: 350px;
        height: 20vh;

        background-color: dimgrey;
        border-radius: 20px;
        padding: 1.5rem;
    }

    .form button {
        margin-top: auto;
    }

    .error {
        color: red;
        font-size: 1rem;
        max-width: 300px;
        white-space: normal;
        overflow-wrap: normal;
    }
</style>