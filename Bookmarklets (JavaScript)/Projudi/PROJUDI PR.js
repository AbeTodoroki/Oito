let extractedText = '';
let pageCount = 0;

function extractTextAndClickNext() {
    let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    let matches = [];
    let text;
    let arrowNext;

    let iframe = document.querySelector("#userMainFrame") || document.querySelector("body > div:nth-child(16) > iframe") || document.querySelector("body > div:nth-child(30) > iframe");
    let doc = iframe ? (iframe.contentDocument || iframe.contentWindow.document) : document;

    if (doc && doc.body) {
        text = doc.body.innerText;
    } else {
        alert("Document body not found!");
        return;
    }

    let match;
    while (match = regex.exec(text)) {
        matches.push(match[0]);
    }

    if (matches.length > 0) {
        let values = matches.join('\n');
        extractedText += values + '\n';
    } else {
        alert("No values found on this page!");
        return;
    }

    arrowNext = doc.querySelector('#navigator > div.navRight > a.arrowNextOn') || doc.querySelector('a[alt="próxima"][title="próxima página"]');
    if (arrowNext && pageCount < 99) {
        pageCount++;
        arrowNext.click();
        setTimeout(extractTextAndClickNext, 20000);
    } else {
        showMatches();
    }
}

function showMatches() {
    const allMatches = extractedText.split('\n');
    const numberOfLines = allMatches.length;
    console.log(extractedText);

    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            setTimeout(proceedWithConfirmation, 2000);
        }
    }

    function proceedWithConfirmation() {
        const confirmation = confirm(`${numberOfLines} Processos encontrados.\nDeseja copiar para a área de transferência?`);
        if (confirmation) {
            navigator.clipboard.writeText(extractedText).catch((err) => {
                console.error('Erro ao copiar texto para a área de transferência: ' + err);
            });
        }
    }

    if (document.visibilityState === 'visible') {
        setTimeout(proceedWithConfirmation, 2000);
    } else {
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }
}

extractTextAndClickNext();