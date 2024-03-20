// PROJUDI BA e GO
function redirectToNewURL() {
    const hostname = window.location.hostname;
  
    if (hostname === 'projudi.tjba.jus.br') {
      window.location.href = 'https://projudi.tjba.jus.br/projudi/usuarioRepresentante/CentroUsuarioRepresentante';
    } else if (hostname === 'projudi.tjgo.jus.br') {
      window.location.href = 'https://projudi.tjgo.jus.br/BuscaProcesso';
    }
  }
  
  // Call the function to perform the redirect based on the domain
  redirectToNewURL();

// PROJUDI AM
// AM: https://projudi.tjam.jus.br/projudi/processo/processosParte.do?actionType=listar
// Page updates every time one page change.