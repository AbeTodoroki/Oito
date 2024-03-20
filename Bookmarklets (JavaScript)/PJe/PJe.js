javascript:


async function ComarcaIndex() {
    let elements = document.querySelectorAll('span.nomeTarefa');

    for (let element of elements) {
        element.click();
        await WaitForPageLoad();
    }
}

async function CxEntradaIndex() {
    let elements = document.querySelectorAll('span.nomeTarefa');

    for (let element of elements) {
        if (element.textContent.trim() === 'Caixa de entrada') {
            element.click();
            await WaitForPageLoad();
            await navigatePages();
        }
    }
}

function WaitForPageLoad() {
    return new Promise((resolve, reject) => {
        const statusIndicator = document.getElementById('_viewRoot:status.start');
        const checkStatus = setInterval(() => {
            if (statusIndicator && statusIndicator.style.display === 'none') {
                clearInterval(checkStatus);
                resolve();
            }
        }, 200);
    });
}

function ExtractText() {
    const regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    const text = document.body.innerText;

    if (text.length > 0) {
        let lines = text.split('\n');
        lines.forEach((line) => {
            let found = line.match(regex);
            if (found) {
                ExtractedText = ExtractedText.concat(found);
            }
        });
    }
}

async function navigatePages() {
    try {
        const firstPageLink = document.querySelector("#formAcervo\\:tbProcessos\\:scPendentes_table > tbody > tr > td:nth-child(1)");
        if (firstPageLink) {
            firstPageLink.click();
            await WaitForPageLoad();
        }

        let pageNumber = 1;
        while (true) {
            await ExtractText();

            let nextPageLink = document.querySelector(`.rich-datascr-inact[onclick*="'page': '${pageNumber + 1}'"]`);

            if (!nextPageLink) {
                break;
            }

            nextPageLink.click();
            await WaitForPageLoad();
            pageNumber++;
        }
    } catch (error) {
        console.error('Erro na função navigatePages: ', error);
        throw error;
    }
}

function showMatches() {
    const allMatches = ExtractedText.flat().join('\n');
    const numberOfLines = allMatches.split('\n').length;

    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            proceedWithConfirmation();
        }
    }

    function proceedWithConfirmation() {
        const confirmation = confirm(`${numberOfLines} Processos encontrados.\nDeseja copiar para a área de transferência?`);
        if (confirmation) {
            navigator.clipboard.writeText(allMatches).catch((err) => {
                console.error('Erro ao copiar texto para a área de transferência: ' + err);
            });
        }
    }

    if (document.visibilityState === 'visible') {
        proceedWithConfirmation();
    } else {
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }
}

let ExtractedText = [];

ComarcaIndex().then(() => {
    CxEntradaIndex().then(() => {
        showMatches();
    });
});