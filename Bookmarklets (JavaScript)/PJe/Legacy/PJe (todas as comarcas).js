javascript: function waitForPageLoad() {
    return new Promise(function(resolve) {
        var statusIndicator = document.getElementById('_viewRoot:status.start');
        var checkStatus = setInterval(function() {
            if (statusIndicator.style.display === 'none') {
                clearInterval(checkStatus);
                resolve();
            }
        }, 200);
    });
}

var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
var extractedText = [];

function extractTextFromPage() {
    var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');

    if (textNodes.length === 0) {
        textNodes = document.querySelectorAll('.numero-processo-acervo[title="Autos Digitais"]');
    }

    if (textNodes.length > 0) {
        textNodes.forEach(function(element) {
            var textContent = element.textContent.trim();
            var found = textContent.match(regex);
            if (found) {
                extractedText.push(found);
            }
        });
    }
}

function triggerEvent(pageNumber) {
    var pageLink = document.querySelector('.rich-data-scr-inact[onclick*="\'page\': \'' + pageNumber + '\'"]');
    if (pageLink) {
        pageLink.click();
        waitForPageLoad().then(function() {
            extractTextFromPage();
            var nextPageLink = document.querySelector('.rich-data-scr-inact[onclick*="\'page\': \'' + (pageNumber + 1) + '\'"]');
            if (nextPageLink) {
                triggerEvent(pageNumber + 1);
            } else {
                cycling();
            }
        });
    }
}

var statusIndicator = document.getElementById('_viewRoot:status.start');
var interval = setInterval(function() {
    if (statusIndicator.style.display === 'none') {
        clearInterval(interval);
        setTimeout(function() {
            extractTextFromPage();
            var nextPageLink = document.querySelector('.rich-data-scr-inact[onclick*="\'page\': \'2\'"]');
            if (nextPageLink) {
                triggerEvent(2);
            } else {
                cycling();
            }
        }, 0);
    }
}, 200);

var comarcas = document.querySelectorAll('span.nomeTarefa');

async function cycling() {
    for (let index = 0; index < comarcas.length; index++) {
        var caixaEntrada = comarcas[index];
        caixaEntrada.click();
        await waitForPageLoad();
        extractTextFromPage();
    }
    showMatches();
}

function showMatches() {
    var allMatches = extractedText.flat().join('\n');
    var numberOfLines = allMatches.split('\n').length;

    var confirmation = confirm(numberOfLines + ' Processos encontrados.\nDeseja copiar para a área de transferência?');

    if (confirmation) {
        navigator.clipboard.writeText(allMatches).then(function() {
        }).catch(function(err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
}