let extractedText = '';

function extractTextAndClickNext() {
    let iframe = document.getElementsByName('userMainFrame')[0];

    if (iframe) {
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDocument && iframeDocument.body) {
            let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
            let matches = [];
            let text = iframeDocument.body.innerText;
            
            let match;
            while (match = regex.exec(text)) {
                matches.push(match[0]);
            }

            if (matches.length > 0) {
                let values = matches.join('\n');
                extractedText += values + '\n';
            }

            let arrowNext = iframeDocument.querySelector('#navigator > div.navRight > a.arrowNextOn');
            let alternativeArrowNext = iframeDocument.querySelector('a[alt="próxima"][title="próxima página"]');
            
            if (arrowNext) {
                arrowNext.click();
                setTimeout(extractTextAndClickNext, 1000);
            } else if (alternativeArrowNext) {
                alternativeArrowNext.click();
                setTimeout(extractTextAndClickNext, 1000);
            } else {
                displayPopup();
            }
        } else {
            alert("No values found on this page!");
        }
    } else {
        alert("Iframe document body not found!");
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
