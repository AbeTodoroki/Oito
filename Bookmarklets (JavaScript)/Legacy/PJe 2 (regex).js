javascript:(function(){
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var extractedText = [];

    function checkForMatches() {
        var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');
        if (textNodes.length > 0) {
            textNodes.forEach(function(element) {
                var textContent = element.textContent.trim();
                var found = textContent.match(regex);
                if (found) {
                    extractedText.push(found);
                }
            });
            triggerEvent('2');
        } else {
            console.log('Nenhum resultado encontrado na página 1.');
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
                        var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');
                        var pageText = [];
                        if (textNodes.length > 0) {
                            textNodes.forEach(function(element) {
                                var textContent = element.textContent.trim();
                                var found = textContent.match(regex);
                                if (found) {
                                    pageText.push(found);
                                }
                            });
                            extractedText.push(pageText);
                        }
                        var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (parseInt(pageNumber) + 1) + '\'"]');
                        if (nextPageLink) {
                            triggerEvent((parseInt(pageNumber) + 1).toString());
                        } else {
                            showMatches(extractedText);
                        }
                    }, 0);
                }
            }, 200);
        }
    }

    function showMatches(extractedText) {
        var allMatches = extractedText.flat().join('\n');
        var numberOfLines = allMatches.split('\n').length;
        navigator.clipboard.writeText(allMatches).then(function() {
            alert(numberOfLines + ' Processos Copiados.');
        }).catch(function(err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }

    checkForMatches();
})();