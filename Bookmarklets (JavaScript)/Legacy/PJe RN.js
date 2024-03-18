javascript: (function() {
    var textNodes = document.querySelectorAll('.numero-processo-expediente[title="Autos Digitais"]');
    var textArray = Array.from(textNodes).map(node => node.textContent.trim());
    var textToCopy = textArray.join('\n');

    navigator.clipboard.writeText(textToCopy).then(function() {
        alert(textArray.length + ' Processos Copiados.');
    }, function(err) {
        console.error('Error copying text to clipboard: ' + err);
    });
})();