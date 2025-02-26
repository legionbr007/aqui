document.addEventListener("DOMContentLoaded", function() {
    let modal = document.getElementById("manutencaoModal");
    let fecharModal = document.getElementById("fecharModal");
    let timerButton2 = document.getElementById("timerButton2");
    /*let timerButton4 = document.getElementById("timerButton4");*/

    // Função para exibir o modal
    function abrirModal(event) {
        event.preventDefault(); // Impede o link de executar alguma ação padrão
        modal.style.display = "flex"; // Exibe o modal
    }

    // Adiciona o evento de clique para ambos os botões
    timerButton2.addEventListener("click", abrirModal);
    /*timerButton4.addEventListener("click", abrirModal);*/

    // Quando clicar no botão "OK", fecha o modal
    fecharModal.addEventListener("click", function() {
        modal.style.display = "none"; // Esconde o modal
    });
});
