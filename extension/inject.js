// Wait for the document to be fully loaded
chrome.runtime.sendMessage({ type: 'init' }, function (response) {
    log("Init from page", response);
    var readyStateCheckInterval = setInterval(async function () {
        log("Waiting for page load complete");
        if (document.readyState === "complete") {
            log("Page is ready now");
            clearInterval(readyStateCheckInterval);

            let path = chrome.runtime.getURL('main.js');
            log(path, "This will be loaded");
            let scriptTag = document.createElement('script');
            scriptTag.src = path;
            // scriptTag.type = 'module';
            // scriptTag.async = true;
            document.body.appendChild(scriptTag);

        }
    }, 10);
});



function log(...msg) {
    console.log("%cMoin Commands", "background: red; color: #bada55");
    console.log(...msg);
}
