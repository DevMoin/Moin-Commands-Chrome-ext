chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
) {
    console.log({
        request, sender, sendResponse
    });
    if (request.type == "init") {
        sendResponse({})
        return true;
    }

});