// PROJUDI BA e GO
javascript:


function redirectToNewURL() {
    const hostname = window.location.hostname;

    if (hostname === 'projudi.tjba.jus.br') {
        window.location.href = 'https://projudi.tjba.jus.br/projudi/usuarioRepresentante/CentroUsuarioRepresentante';
    } else if (hostname === 'projudi.tjgo.jus.br') {
        window.location.href = 'https://projudi.tjgo.jus.br/BuscaProcesso';
    }
}

redirectToNewURL();

// PROJUDI AM: https://projudi.tjam.jus.br/projudi/processo/processosParte.do?actionType=listar
// PROJUDI GO: https://projudi.tjgo.jus.br/BuscaProcesso
// Page updates every time one page change.

// PROJUDI GO doesn't have a next page button.

// PROJUDI PR: https://projudi.tjpr.jus.br/projudi/processosAdvogado.do?_tj=1be45dd0d26ba84292fb12f872e7d8eeb0a6bad91afcb84c172344d96770e8417de581a0203474ab
// Needs to be tested.