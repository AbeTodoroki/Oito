function ComarcaIndex() {
    return new Promise((resolve, reject) => {
        var elements = document.querySelectorAll('span.nomeTarefa');

        elements.forEach(element => {
            element.click();
        });

        WaitForPageLoad().then(() => {
            resolve();
        });
    });
}

function CxEntradaIndex() {
    return new Promise((resolve, reject) => {
        var elements = document.querySelectorAll('span.nomeTarefa');
        var caixaPromises = [];

        elements.forEach(element => {
            if (element.textContent.trim() === 'Caixa de entrada') {
                element.click();
                var promise = new Promise((resolve, reject) => {
                    WaitForPageLoad().then(() => {
                        ExtractText().then(() => resolve());
                    });
                });
                caixaPromises.push(promise);
            }
        });

        Promise.all(caixaPromises).then(() => {
            resolve();
        });
    });
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

function extractText() {
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var text = document.body.innerText;

    if (text.length > 0) {
        text.forEach(function (element) {
            var textContent = element.textContent.trim();
            var found = textContent.match(regex);
            if (found) {
                extractedText.push(found);
            }
        });
    }
}

function showMatches() {
    var allMatches = extractedText.flat().join('\n');
    var numberOfLines = allMatches.split('\n').length;
    var confirmation = confirm(numberOfLines + ' Processos encontrados.\nDeseja copiar para a área de transferência?');

    if (confirmation) {
        navigator.clipboard.writeText(allMatches).then(function () {
        }).catch(function (err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
}

var extractedText = [];

ComarcaIndex().then(() => {
    CxEntradaIndex().then(() => {
        showMatches();
    });
});