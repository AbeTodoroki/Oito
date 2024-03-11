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


// PROJUDI AM e GO
// AM: https://projudi.tjam.jus.br/projudi/processo/processosParte.do?actionType=listar
// GO: https://projudi.tjgo.jus.br/BuscaProcesso
// Não acessar o iframe no código base

// Uma página:

if (document.body) {
    let values = [];
    let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;

    let elements = document.querySelectorAll('td[id^="tdProc"] > a > em');
    let matches = [];

    elements.forEach(element => {
        let text = element.textContent;
        let match = text.match(regex);
        if (match) {
            matches.push(match[0]);
        }
    });

    if (matches.length > 0) {
        values = matches;
    }

    if (values.length === 0) {
        let matches2 = document.body.innerText.match(regex);
        if (matches2) {
            values = matches2;
        }
    }

    if (values.length === 0) {
        for (let i = 1; i <= 15; i++) {
            let selector = `#tabListaProcesso > tr:nth-child(${i}) > td:nth-child(3)`;
            let element = document.querySelector(selector);
            if (element) {
                values.push(element.textContent.trim());
            }
        }
    }

    if (values.length > 0) {
        let textArea = document.createElement("textarea");
        textArea.value = values.join('\n');

        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        alert("Processos copiados:\n" + values.join('\n'));
    } else {
        alert("No values found!");
    }
} else {
    alert("Document body not found!");
}

// Todas as páginas:

let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
let extractedText = '';

function extractTextAndClickNext() {

    if (document.body) {
            let elements = document.querySelectorAll('td[id^="tdProc"] > a > em');
            let matches = [];

            elements.forEach(element => {
                let text = element.textContent;
                let match = text.match(regex);
                if (match) {
                    matches.push(match[0]);
                }
            });

            if (matches.length > 0) {
                let values = matches.join('\n');
                extractedText += values + '\n';

                let arrowNext = document.querySelector('#navigator > div.navRight > a.arrowNextOn')
                if (arrowNext) {
                    arrowNext.click();
                    setTimeout(extractTextAndClickNext, 400);
                } else {
                    displayPopup();
                }
            } else {
                alert("No values found on this page!");
            }
        }
    }

function displayPopup() {
    if (extractedText !== '') {
        var allMatches = extractedText.trim();
        var numberOfLines = allMatches.split('\n').length;
        let confirmation = confirm(numberOfLines + ' Processos encontrados.\nDeseja copiar para a área de transferência?');
        if (confirmation) {
            navigator.clipboard.writeText(allMatches).then(function() {
                alert('Texto copiado para a área de transferência.');
            }).catch(function(err) {
                console.error('Erro ao copiar texto para a área de transferência: ' + err);
            });
        }
    } else {
        alert("No values found on any page!");
    }
}

extractTextAndClickNext();
