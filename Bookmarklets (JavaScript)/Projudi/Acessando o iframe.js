// PROJUDI BA
window.location.href = 'https://projudi.tjba.jus.br/projudi/usuarioRepresentante/CentroUsuarioRepresentante';

setTimeout(() => {
    document.querySelector("body > form > table:nth-child(3) > tbody > tr:nth-child(3) > td > a").click();
}, 200);

setTimeout(() => {
    var xpathResult = document.evaluate(
  "/html/body/div[4]/table/tbody/tr/td/table/tbody/tr[1]/td/a/div/table/tbody/tr/td[2]/font",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
);

var element = xpathResult.singleNodeValue;

if (element) {
  element.click();
} else {
  console.error("Element not found using XPath expression");
}

}, 400);


// PROJUDI GO
// GO: https://projudi.tjgo.jus.br/BuscaProcesso
// Não acessar o iframe no código base


//
