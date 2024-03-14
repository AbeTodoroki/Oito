javascript:

async function ComarcaIndex() {
    var elements = document.querySelectorAll('span.nomeTarefa');

    for (let element of elements) {
        element.click();
        await WaitForPageLoad();
    }
}

async function CxEntradaIndex() {
    var elements = document.querySelectorAll('span.nomeTarefa');

    for (let element of elements) {
        if (element.textContent.trim() === 'Caixa de entrada') {
            element.click();
            await WaitForPageLoad();
            await navigatePages();
        }
    }
}

function WaitForPageLoad() {
    return new Promise(function (resolve) {
        var statusIndicator = document.getElementById('_viewRoot:status.start');
        var checkStatus = setInterval(function () {
            if (statusIndicator && statusIndicator.style.display === 'none') {
                clearInterval(checkStatus);
                resolve();
            }
        }, 200);
    });
}

function ExtractText() {
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var text = document.body.innerText;

    if (text.length > 0) {
        var lines = text.split('\n');
        lines.forEach(function (line) {
            var found = line.match(regex);
            if (found) {
                ExtractedText = ExtractedText.concat(found);
            }
        });
    }
}

async function navigatePages() {
    try {
        var pageNumber = 1;
        while (true) {
            await ExtractText();
            var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (pageNumber + 1) + '\'"]');
            if (!nextPageLink) {
                break;
            }
            nextPageLink.click();
            await WaitForPageLoad();
            pageNumber++;
        }
    } catch (error) {
        console.error('Error in navigatePages function: ', error);
    }
}

function ExtractText() {
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var text = document.body.innerText;

    if (text.length > 0) {
        var lines = text.split('\n');
        lines.forEach(function (line) {
            var found = line.match(regex);
            if (found) {
                ExtractedText = ExtractedText.concat(found);
            }
        });
    }
}

function showMatches() {
    var allMatches = ExtractedText.flat().join('\n');
    var numberOfLines = allMatches.split('\n').length;
    var confirmation = confirm(numberOfLines + ' Processos encontrados.\nDeseja copiar para a área de transferência?');

    if (confirmation) {
        navigator.clipboard.writeText(allMatches).then(function () {
        }).catch(function (err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
}

var ExtractedText = [];

ComarcaIndex().then(() => {
    CxEntradaIndex().then(() => {
        showMatches();
    });
});