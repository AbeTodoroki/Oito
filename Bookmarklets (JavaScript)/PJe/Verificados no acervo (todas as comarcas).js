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

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.textContent.trim() === 'Caixa de entrada') {
            element.click();
            await WaitForPageLoad();

            let search = document.querySelector("#formAcervo\\:filtros > div > div.col-xs-4.col-md-4 > ul > li.dropdown.drop-menu > a");
            if (search !== null) {
                await CriarCaixa();
                await ExtractText();
                await Click("#modalMessage > div > div > div.modal-header > span > a");
            } else {
                console.log("search element not found.");
            }

            elements = document.querySelectorAll('span.nomeTarefa');
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

async function CriarCaixa() {
    await Click("#addCaixa");

    const nmCxInput = document.getElementById('frmNovaCaixa:nmCx');
    if (nmCxInput) {
        nmCxInput.value = "Verificados no acervo";
        await WaitForPageLoad();

        await Click("#frmNovaCaixa\\:btNCx");
        await Click("#frmNovaCaixa > div.modal-footer > input.btn.btn-default.pull-right");
    }

}

async function ExtractText() {
    try {
        const regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
        const text = document.body.innerText;
        let lines = text.split('\n');

        lines.forEach((line) => {
            let found = line.match(regex);
            if (found) {
                ExtractedText = ExtractedText.concat(found);
            }
        });

        await PopularCaixa();

    } catch (error) {
        console.error('Erro na função ExtractText: ', error);
        throw error;
    }
}

async function PopularCaixa() {
    try {
        await Click("#formAcervo\\:tbProcessos\\:j_id1141\\:selecionarTodos") || Click("#formAcervo\\:tbProcessos\\:j_id1140\\:selecionarTodos");
        await Click("#moverPara > i");

        const caixaDestinoSelect = document.getElementById('frmMoverPara:cxDestino');
        if (caixaDestinoSelect) {
            selectOptionByText(caixaDestinoSelect, "Verificados no acervo");
            await WaitForPageLoad();

            await Click("#frmMoverPara\\:btMvPr");
            document.querySelector('.modal-backdrop').style.display = 'none';
        }
    }
    catch (error) {
        console.error('Erro na função ExtractText: ', error);
        throw error;
    }
    if (document.querySelector("#formAcervo\\:filtros > div > div.col-xs-4.col-md-4 > ul > li.dropdown.drop-menu > a > i") !== null) {
        await ExtractText();
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

async function Click(id) {
    const elementQuery = document.querySelector(id);
    if (elementQuery) {
        elementQuery.click();
        await WaitForPageLoad();
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
        } console.log(allMatches);
    }

    if (document.visibilityState === 'visible') {
        setTimeout(proceedWithConfirmation, 2000);
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