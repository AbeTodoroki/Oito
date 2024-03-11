javascript: (function() {
    var matches = [];
	var comarcas = document.querySelectorAll('span.nomeTarefa');

    var firstPageLink = document.querySelector('.rich-datascr-button[onclick*="\'page\': \'first\'"]');
    if (firstPageLink) {
        firstPageLink.click();
    }

    function extractTextFromPage() {
        var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
        var text = document.body.innerText;
		var extractedText = [];
        let match;
        while (match = regex.exec(text)) {
            matches.push(match[0]);
        }

        if (matches.length > 0) {
            let values = matches.join('\n');
            extractedText += values + '\n';
        }
    }

    function triggerEvent(pageNumber) {
        var pageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + pageNumber + '\'"]');
        if (pageLink) {
            pageLink.click();
            waitForPageLoad().then(function() {
                extractTextFromPage();
                var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (pageNumber + 1) + '\'"]');
                if (nextPageLink) {
                    triggerEvent(pageNumber + 1);
                } else {
                    showMatches();
                }
            });
        }
    }

    function waitForPageLoad() {
        return new Promise(function(resolve) {
            var statusIndicator = document.getElementById('_viewRoot:status.start');
            var checkDisplayInterval = setInterval(function() {
                if (statusIndicator.style.display === 'none') {
                    clearInterval(checkDisplayInterval);
                    resolve();
                }
            }, 200);
        });
    }

    waitForPageLoad().then(function() {
        extractTextFromPage();
        var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'2\'"]');
        if (nextPageLink) {
            triggerEvent(2);
        } else {
            showMatches();
        }
    });

    function showMatches() {
        var allMatches = matches.flat().join('\n');
        var numberOfLines = allMatches.split('\n').length;
        navigator.clipboard.writeText(allMatches).then(function() {
            alert(numberOfLines + ' Processos Copiados.');
        }).catch(function(err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
})();
