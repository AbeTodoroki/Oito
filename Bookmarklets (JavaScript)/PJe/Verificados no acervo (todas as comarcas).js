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
    let i = 0;

    while (i < elements.length) {
        let element = elements[i];
        let initialLength = ExtractedText.length;
        if (element.textContent.trim() === 'Caixa de entrada') {
            element.click();
            await WaitForPageLoad();
            await navigatePages();
            if (ExtractedText.length > initialLength) {
                await PopularCaixa();
            }
        }
        elements = document.querySelectorAll('span.nomeTarefa');
        i++;
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

async function Click(id) {
    const elementQuery = document.querySelector(id);
    if (elementQuery) {
        elementQuery.click();
        await WaitForPageLoad();
    }
}

async function PopularCaixa() {
    await Click("#formAcervo\\:tbProcessos\\:j_id1141\\:selecionarTodos");
    await Click("#moverPara > i");
    const caixaDestinoSelect = document.getElementById('frmMoverPara:cxDestino');
    if (caixaDestinoSelect) {
        selectOptionByText(caixaDestinoSelect, "Verificados no acervo");
        await WaitForPageLoad();
        await Click("#frmMoverPara\\:btMvPr");
        document.querySelector('.modal-backdrop').style.display = 'none';
    }
    PopularCaixa();
}

function selectOptionByText(selectElement, text) {
    for (let option of selectElement.options) {
        if (option.text === text) {
            option.selected = true;
            break;
        }
    }
}

function showMatches() {
    const allMatches = ExtractedText.flat().join('\n');
    const numberOfLines = allMatches.split('\n').length;

    window.addEventListener('focus', function onFocused() {
        window.removeEventListener('focus', onFocused);

        const confirmation = confirm(`${numberOfLines} Processos encontrados.\nDeseja copiar para a área de transferência?`);

        if (confirmation) {
            navigator.clipboard.writeText(allMatches).catch((err) => {
                console.error('Erro ao copiar texto para a área de transferência: ' + err);
            });
        }
    });
}

let ExtractedText = [];

ComarcaIndex().then(() => {
    CxEntradaIndex().then(() => {
        showMatches();
    });
});