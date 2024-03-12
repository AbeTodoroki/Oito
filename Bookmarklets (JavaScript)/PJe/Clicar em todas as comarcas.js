function clickOnFirstIndexElements() {
    return new Promise((resolve, reject) => {
        var elements = document.querySelectorAll('span.nomeTarefa');

        elements.forEach(element => {
            element.click();
        });

        waitForPageLoad().then(() => {
            resolve();
        });
    });
}

function clickOnSecondIndexElements() {
    var elements = document.querySelectorAll('span.nomeTarefa');

    elements.forEach(element => {
        if (element.textContent.trim() === 'Caixa de entrada') {
            element.click();
        }
    });
}

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

clickOnFirstIndexElements().then(() => {
    clickOnSecondIndexElements();
});
