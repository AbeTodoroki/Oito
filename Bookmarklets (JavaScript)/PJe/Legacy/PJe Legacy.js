javascript: (function() {
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var extractedText = [];

    var firstPageLink = document.querySelector('.rich-datascr-button[onclick*="\'page\': \'first\'"]');
    if (firstPageLink) {
        firstPageLink.click();
    }

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
        } else {
            console.log('Nenhum resultado encontrado na página.');
        }
    }

    function triggerEvent(pageNumber) {
        var pageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + pageNumber + '\'"]');
        if (pageLink) {
            pageLink.click();
            var statusIndicator = document.getElementById('_viewRoot:status.start');
            var interval = setInterval(function() {
                if (statusIndicator.style.display === 'none') {
                    clearInterval(interval);
                    setTimeout(function() {
                        extractTextFromPage();
                        var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (pageNumber + 1) + '\'"]');
                        if (nextPageLink) {
                            triggerEvent(pageNumber + 1);
                        } else {
                            showMatches();
                        }
                    }, 0);
                }
            }, 200);
        }
    }

    var statusIndicator = document.getElementById('_viewRoot:status.start');
    var interval = setInterval(function() {
        if (statusIndicator.style.display === 'none') {
            clearInterval(interval);
            setTimeout(function() {
                extractTextFromPage();
                var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'2\'"]');
                if (nextPageLink) {
                    triggerEvent(2);
                } else {
                    showMatches();
                }
            }, 0);
        }
    }, 200);

    function showMatches() {
        var allMatches = extractedText.flat().join('\n');
        var numberOfLines = allMatches.split('\n').length;
        navigator.clipboard.writeText(allMatches).then(function() {
            alert(numberOfLines + ' Processos Copiados.');
        }).catch(function(err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
})();
