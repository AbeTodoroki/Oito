// As principais diferença entre o Projudi e os outros códigos é a necessidade de buscar pelo processo usando regex e a execução do código pelo console.
// Isso porque um bookmarklet não tem acesso ao iframe utilizado para gerar a tabela de processos da página.
// E a regra do regex é necessário para filtrar o texto do processo, uma vez que o elemento gera um texto difícil de filtrar pelo Google Sheets.

// Nesse caso precisaremos de múltiplas funções.

javascript:(function(){
    // Cria um array vazio para armazenar o texto extraído.
    var extractedText = [];

    // A função checkForMatches é parecida com o código anterior.
    // Irá extrair os valores da página atual e chamará a função triggerEvent para a página 2.
    // Primeira iteração antes de mudar de página (captura da página 1).

    function checkForMatches() {
        // Seleciona todos os elementos HTML com a classe "numero-processo-acervo" e "text-bold".
        var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');
        // Verifica se há elementos correspondentes.
        if (textNodes.length > 0) {
            // Itera sobre os elementos encontrados e adiciona o texto de cada um ao array "extractedText".
            textNodes.forEach(function(element) {
                extractedText.push(element.textContent.trim());
            });
            // Chama a função triggerEvent() com o argumento '2' para mudar para a página 2.
            triggerEvent('2');
        } else {
            // Se não houver correspondências, exibe o erro.
            console.log('Nenhum resultado encontrado na página 1.');
        }
    }

    // A função triggerEvent irá localizar e interagir com o botão de mudar de página, encontrado no elemento '.rich-datascr-inact...'
    // A numeração será gerada baseada na página atual.
    // Após a mudança de página, irá monitorar o status da página até ela terminar de carregar ('_viewRoot:status.start').
    // Isso foi especialmente útil quando utiliza TJs lentos, onde o tempo de load de cada página pode demorar vários segundos.
    // Feito a mudança, irá copiar os elementos da página, como na primeira função e adiciona no texto final.
    // Após isso, irá localizar se há um elemento de página maior que ele. Ex.: Se na página 2 é possível encontrar no código o elemento página 3.
    // Se sim, irá somar +1 no valor da pageNumber e executar a função novamente.
    // Por precaução adicionei .2 segundos entre execuções.
    // Se não, seguirá para a última função.

    function triggerEvent(pageNumber) {
        // Seleciona o link da página com base no número da página.
        var pageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + pageNumber + '\'"]');
        // Verifica se o link da página foi encontrado.
        if (pageLink) {
            // Clica no link da página.
            pageLink.click();
            // Obtém o indicador de status.
            // Este indicador é usado quando uma página termina de carregar.
            var statusIndicator = document.getElementById('_viewRoot:status.start');
            // Define um intervalo para verificar se o indicador de status está oculto.
            var interval = setInterval(function() {
                if (statusIndicator.style.display === 'none') {
                    // Quando o indicador de status estiver oculto, limpa o intervalo e executa o código dentro dele.
                    clearInterval(interval);
                    setTimeout(function() {
                        // Extrai os textos dos elementos correspondentes na página atual.
                        var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');
                        var pageText = [];
                        if (textNodes.length > 0) {
                            // Itera sobre os elementos e adiciona os textos ao array "pageText".
                            textNodes.forEach(function(element) {
                                pageText.push(element.textContent.trim());
                            });
                            // Adiciona os textos da página ao array "extractedText".
                            extractedText.push(pageText);
                        }
                        // Seleciona o link da próxima página e chama a função triggerEvent() recursivamente.
                        var nextPageLink = document.querySelector('.rich-datascr-inact[onclick*="\'page\': \'' + (parseInt(pageNumber) + 1) + '\'"]');
                        if (nextPageLink) {
                            triggerEvent((parseInt(pageNumber) + 1).toString());
                        } else {
                            // Se não houver próximo link de página, chama a função showMatches().
                            showMatches(extractedText);
                        }
                    }, 0);
                }
            }, 200); // Tempo entre iterações (ms).
        }
    }

    // Função para exibir os textos extraídos.
    function showMatches(extractedText) {
        // Combina todos os textos extraídos em uma única string, separados por nova linha.
        var allMatches = extractedText.flat().join('\n');
        // Conta o número de linhas na string de texto.
        var numberOfLines = allMatches.split('\n').length;
        // Copia os textos extraídos para a área de transferência do navegador.
        navigator.clipboard.writeText(allMatches).then(function() {
            // Exibe um alerta com o número de processos copiados.
            alert(numberOfLines + ' Processos Copiados.');
        }).catch(function(err) {
            // Se houver algum erro ao copiar, exibe uma mensagem de erro no console.
            console.error('Erro ao copiar texto para a área de transferência: ' + err);
        });
    }

    // Chama a função checkForMatches() para iniciar o processo de extração de texto.
    checkForMatches();
})();