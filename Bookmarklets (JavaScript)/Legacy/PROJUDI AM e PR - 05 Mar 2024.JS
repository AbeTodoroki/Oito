let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
let iframe = document.getElementsByName('userMainFrame')[0];

if (iframe) {
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDocument && iframeDocument.body) {
        let elements = iframeDocument.querySelectorAll('td[id^="tdProc"] > a > em');
        let matches = [];

        elements.forEach(element => {
            let text = element.textContent;
            let match = text.match(regex);
            if (match) {
                matches.push(match[0]);
            }
        });

        if (matches.length > 0) {
            let values = matches.join('\n');
            let textArea = document.createElement("textarea");
            textArea.value = values;

            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            alert("Processos copiados:\n" + values);
        } else {
            alert("No matches found!");
        }
    } else {
        alert("Iframe document body not found!");
    }
} else {
    alert("Iframe 'userMainFrame' not found!");
}