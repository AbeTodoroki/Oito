let regex = /(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4})/g;
let iframe = document.getElementsByName('userMainFrame')[0];

if (iframe) {
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDocument && iframeDocument.body) {
        let matches = iframeDocument.body.innerText.match(regex);

        if (matches) {
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