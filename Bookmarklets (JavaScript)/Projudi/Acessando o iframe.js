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
// PROJUDI PR: https://projudi.tjpr.jus.br/projudi/processo/procuradoresNaoHabilitadosBusca.do?actionType=pesquisarProcessos
// Page updates every time one page change.

// PROJUDI GO doesn't have a next page button.