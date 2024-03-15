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
    let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    let text = document.body.innerText;

    if (text.length > 0) {
        let lines = text.split('\n');
        lines.forEach(function (line) {
            let found = line.match(regex);
            if (found) {
                ExtractedText = ExtractedText.concat(found);
            }
        });
    }
}

async function navigatePages() {
    try {
        let pageNumber = 1;
        while (true) {
            await ExtractText();
            let nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (pageNumber + 1) + '\'"]');
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

async function processNewCaixa() {
    try {
        let addCaixaLink = document.getElementById('addCaixa');
        if (addCaixaLink) {
            addCaixaLink.click();
            await WaitForPageLoad();

            let nmCxInput = document.getElementById('frmNovaCaixa:nmCx');
            if (nmCxInput) {
                nmCxInput.value = "Verificados no acervo";
                await WaitForPageLoad();

                let criarCaixaButton = document.getElementById('frmNovaCaixa:btNCx');
                if (criarCaixaButton) {
                    criarCaixaButton.click();
                    await WaitForPageLoad();

                    let finalizarButton = document.querySelector('input[type="reset"][value="Finalizar"]');
                    if (finalizarButton) {
                        finalizarButton.click();
                        await WaitForPageLoad();
                    }

                    let selecionarTodos = document.querySelector('[id$=":selecionarTodos"]');
                    if (selecionarTodos) {
                        selecionarTodos.click();
                        await WaitForPageLoad();

                        let moverParaLink = document.getElementById('moverPara');
                        if (moverParaLink) {
                            moverParaLink.click();
                            await WaitForPageLoad();

                            let caixaDestinoSelect = document.getElementById('frmMoverPara:cxDestino');
                            if (caixaDestinoSelect) {
                                selectOptionByText(caixaDestinoSelect, "Verificados no acervo");
                                await WaitForPageLoad();

                                let btMvPrButton = document.getElementById('frmMoverPara:btMvPr');
                                if (btMvPrButton) {
                                    btMvPrButton.click();
                                    await WaitForPageLoad();

                                    moveSelectedItems();
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in processNewCaixa function: ', error);
    }
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
    let allMatches = ExtractedText.flat().join('\n');
    let numberOfLines = allMatches.split('\n').length;
    let confirmation = confirm(numberOfLines + ' Processos encontrados.\nDeseja copiar para a área de transferência?');

    if (confirmation) {
        navigator.clipboard.writeText(allMatches).then(function () {
        }).catch(function (err) {
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }
}

let ExtractedText = [];

ComarcaIndex().then(() => {
    CxEntradaIndex().then(() => {
        showMatches();
    });
});
