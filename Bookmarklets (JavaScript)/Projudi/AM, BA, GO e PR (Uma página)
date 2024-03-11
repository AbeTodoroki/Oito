let iframe = document.getElementsByName('userMainFrame')[0];

if (iframe) {
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDocument && iframeDocument.body) {
        let values = [];
        let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;

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
            values = matches;
        }

        if (values.length === 0) {
            let matches2 = iframeDocument.body.innerText.match(regex);
            if (matches2) {
                values = matches2;
            }
        }

        if (values.length === 0) {
            for (let i = 1; i <= 15; i++) {
                let selector = `#tabListaProcesso > tr:nth-child(${i}) > td:nth-child(3)`;
                let element = iframeDocument.querySelector(selector);
                if (element) {
                    values.push(element.textContent.trim());
                }
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
