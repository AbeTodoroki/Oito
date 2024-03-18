let iframe = document.getElementsByName('userMainFrame')[0];

if (iframe) {
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDocument && iframeDocument.body) {
        let values = [];

        for (let i = 1; i <= 15; i++) {
            let selector = `#tabListaProcesso > tr:nth-child(${i}) > td:nth-child(3)`;
            let element = iframeDocument.querySelector(selector);
            if (element) {
                values.push(element.textContent.trim());
            }
        }

        if (values.length > 0) {
            let textArea = document.createElement("textarea");
            textArea.value = values.join('\n');

            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            alert("Processos copiados:\n" + values.join('\n'));
        } else {
            alert("No values found!");
        }
    } else {
        alert("Iframe document body not found!");
    }
} else {
    alert("Iframe 'userMainFrame' not found!");
}