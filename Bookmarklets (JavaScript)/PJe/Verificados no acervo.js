javascript: (function() {
    function waitForPageLoad() {
        return new Promise(function(resolve) {
            var statusIndicator = document.getElementById('_viewRoot:status.start');
            var checkStatus = setInterval(function() {
                if (statusIndicator.style.display === 'none') {
                    clearInterval(checkStatus);
                    resolve();
                }
            }, 200);
        });
    }

    async function processNewCaixa() {
        var addCaixaLink = document.getElementById('addCaixa');
        if (addCaixaLink) {
            addCaixaLink.click();
            await waitForPageLoad();

            var nmCxInput = document.getElementById('frmNovaCaixa:nmCx');
            if (nmCxInput) {
                nmCxInput.value = "Verificados no acervo";
                await waitForPageLoad();

                var criarCaixaButton = document.getElementById('frmNovaCaixa:btNCx');
                if (criarCaixaButton) {
                    criarCaixaButton.click();
                    await waitForPageLoad();

                    var finalizarButton = document.querySelector('input[type="reset"][value="Finalizar"]');
                    if (finalizarButton) {
                        finalizarButton.click();
                        await waitForPageLoad();
                    }

                    var selecionarTodos = document.querySelector('[id$=":selecionarTodos"]');
                    if (selecionarTodos) {
                        selecionarTodos.click();
                        await waitForPageLoad();

                        var moverParaLink = document.getElementById('moverPara');
                        if (moverParaLink) {
                            moverParaLink.click();
                            await waitForPageLoad();

                            var caixaDestinoSelect = document.getElementById('frmMoverPara:cxDestino');
                            if (caixaDestinoSelect) {
                                selectOptionByText(caixaDestinoSelect, "Verificados no acervo");
                                await waitForPageLoad();

                                var btMvPrButton = document.getElementById('frmMoverPara:btMvPr');
                                if (btMvPrButton) {
                                    btMvPrButton.click();
                                    await waitForPageLoad();

                                    moveSelectedItems();
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    async function moveSelectedItems() {
        var checkbox = document.querySelector('[id$=":selecionarTodos"]');
        if (checkbox) {
            checkbox.click();
            await waitForPageLoad();

            var moveLink = document.getElementById('moverPara');
            if (moveLink) {
                moveLink.click();
                await waitForPageLoad();

                var moveButton = document.getElementById('frmMoverPara:btMvPr');
                if (moveButton) {
                    moveButton.click();
                    await waitForPageLoad();
                    document.querySelector('.modal-backdrop').style.display = 'none';
                }
                moveSelectedItems();
            }
        }
    }

    function selectOptionByText(selectElement, text) {
        for (var option of selectElement.options) {
            if (option.text === text) {
                option.selected = true;
                break;
            }
        }
    }

    processNewCaixa();
})();