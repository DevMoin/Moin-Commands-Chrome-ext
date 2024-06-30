/* TODO: Hack remove this 💩 */
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

// Called when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item that only appears when text is selected
    chrome.contextMenus.create({
      id: "moinSearch",       // Unique ID for the context menu item
      title: "Moin Search With",  // Text that appears in the context menu
      contexts: ["selection"]         // Only show when text is selected
    });
  });
  
  // Called when the context menu item is clicked
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info);
    if (info.menuItemId === "moinSearch") {
      // Execute a script in the current tab, passing the selected text as an argument
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: triggerCustomEvent,
        args: [info.selectionText]
      });
    }
  });
  
  // Function to create and dispatch a custom event with the selected text
  function triggerCustomEvent(selectedText) {
    const event = new CustomEvent('moinSearchEvent', { detail: { selectedText } });
    document.dispatchEvent(event);
  }
  