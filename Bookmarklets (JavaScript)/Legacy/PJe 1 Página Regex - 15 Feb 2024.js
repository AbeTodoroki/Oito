javascript: (function() {
    var regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
    var textNodes = document.querySelectorAll('.numero-processo-acervo .text-bold');
    var matches = [];

    textNodes.forEach(function(node) {
        var textContent = node.textContent.trim();
        var found = textContent.match(regex);
        if (found) {
            matches = matches.concat(found);
        }
    });
    var textToCopy = matches.join('\n');
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert(matches.length + ' Processos Copiados.');
    }, function(err) {
        console.error('Error copying text to clipboard: ' + err);
    });
})();