document.addEventListener("DOMContentLoaded", function () {
    // Carregar os usuários registrados do localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Evento para registro
    document.getElementById("submit-register").addEventListener("click", function (event) {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();

        // Limpar mensagens de erro antes de validar
        document.getElementById("register-email-error").style.display = "none";
        document.getElementById("register-password-error").style.display = "none";
        document.getElementById("register-email-invalid-error").style.display = "none";

        // Verificar se os campos estão vazios
        if (!name || !email || !password) {
            return;
        }

        // Verificar se o email já está registrado
        if (users.find((user) => user.email === email)) {
            document.getElementById("register-email-error").style.display = "block"; // "Este email já está registrado."
            return;
        }

        // Verificar se o email é válido (contém @gmail.com)
        if (!email.includes("@gmail.com")) {
            document.getElementById("register-email-invalid-error").style.display = "block"; // "Coloque um email válido."
            return;
        }

        // Verificar se a senha tem mais de 3 caracteres
        if (password.length < 4) {
            document.getElementById("register-password-error").style.display = "block"; // "Você precisa colocar uma senha com no mínimo 4 caracteres."
            return;
        }

        // Adicionar o novo usuário
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Exibir a tela de sucesso
        document.getElementById("success-message").innerText = "Cadastro realizado com sucesso!";
        document.getElementById("success-screen").style.display = "flex";

        // Limpar os campos após o cadastro
        document.getElementById("register-name").value = "";
        document.getElementById("register-email").value = "";
        document.getElementById("register-password").value = "";
    });

    // Evento para login
    document.getElementById("submit-login").addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        // Limpar mensagens de erro antes de validar
        document.getElementById("login-email-error").style.display = "none";
        document.getElementById("login-password-error").style.display = "none";
        document.getElementById("login-blank-error").style.display = "none";

        // Verificar se os campos estão vazios
        if (!email || !password) {
            document.getElementById("login-blank-error").style.display = "block";
            return;
        }

        // Recarregar a lista de usuários do localStorage
        users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar se o email está registrado
        const user = users.find((user) => user.email === email);
        if (!user || user.password !== password) {
            document.getElementById("login-email-error").innerText = "Email ou senha incorretos.";
            document.getElementById("login-email-error").style.display = "block";
            return;
        }

        // Exibir a tela de sucesso de login
        document.getElementById("success-message").innerText = `Bem-vindo, ${user.name}!`;
        document.getElementById("success-screen").style.display = "flex";
    });

    // Fechar a tela de sucesso quando clicar no botão OK
    document.getElementById("ok-button").addEventListener("click", function () {
        document.getElementById("success-screen").style.display = "none";
    });
});