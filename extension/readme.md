```json
{
    "update_url": "https://clients2.google.com/service/update2/crx",
    "name": "Memory Saver",
    "version": "1.6",
    "description": "Reduce Chrome's memory usage by setting inactive tabs to sleep or system memory is low",
    "manifest_version": 3,
    "permissions": [
        "storage",
        "alarms",
        "system.memory"
    ],
    "host_permissions": [
        "*://*/*"
    ],
    "background": {
        "service_worker": "background.js"
    },
    "content_scripts": [
        {
            "matches": [
                "*://*/*"
            ],
            "js": [
                "content.js"
            ]
        }
    ],
    "action": {
        "default_popup": "popup.html",
        "default_icon": {
            "16": "images/icon.png"
        }
    },
    "icons": {
        "16": "images/icon.png",
        "18": "images/icon.png",
        "19": "images/icon.png",
        "32": "images/icon.png",
        "36": "images/icon.png",
        "38": "images/icon.png",
        "48": "images/icon.png",
        "64": "images/icon.png",
        "128": "images/icon.png",
        "256": "images/icon.png"
    }
}
```

```js background.js
///////// MESSAGE RECEIVED LISTENER /////////
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    let tabSender = sender.tab;
    if (request.cmd == "TimeOutExpired") {
        if (!tabSender.active && !tabSender.audible && !tabSender.discarded && !tabSender.pinned) {
            chrome.tabs.discard(tabSender.id, function() {
                //console.log(getActualHour() + " => Tab Inactivity - TimeOutExpired - Discarded tab : "+ tabSender.url + " Id : "+tabSender.id ); 
            });
        } else {
            if (tabSender.pinned && !keepPinnedTabs)
                chrome.tabs.discard(tabSender.id, function() {
                    //console.log(getActualHour() + " => Tab Inactivity - TimeOutExpired - Discarded tab : "+ tabSender.url + " Id : "+tabSender.id ); 
                });
        }
    }
    // this is just to read messages. Commenting as there's no logic								  
    //if (request.cmd == "TimeOutSet") { } 
    //if (request.cmd == "TimeOutRemoved") { } 							  
    if (request.cmd == "DiscardAll") {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                if (!tab.active && !tab.audible && !tab.discarded && !tab.pinned) {
                    chrome.tabs.discard(tab.id, function() {})
                } else {
                    if (tab.pinned && !keepPinnedTabs)
                        chrome.tabs.discard(tab.id, function() {});
                }
            });
        });
    }
    if (request.cmd == "RestoreAll") {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                if (!tab.active && !tab.audible && tab.discarded) {
                    chrome.tabs.reload(tab.id, {}, function() {})
                }
            });
        });
    }
});

```

```html popup.html 
btn#btnDiscardAll
<script src="popup.js"></script>
```

```js popup.js
    btnDiscardAll.onclick = function() {
        chrome.runtime.sendMessage({
            cmd: "DiscardAll"
        }, {});
    }
    
    
    chrome.storage.sync.set({
        timeOutSetting: timeVal
    }, function() {});
    

    chrome.storage.sync.get('memThreshold', (result) => inputMemCtrl.value = ConvertBytes(result.memThreshold));
```

```js content.js
var tId = 0;

var timeoutVal = new Promise(resolve => {
    chrome.storage.sync.get('timeOutSetting', function(result) {
        let timeout = parseInt(result.timeOutSetting);
        resolve(timeout);
    });
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        window.clearTimeout(tId);
    } else {
        timeoutVal.then(function(data) {
            data = data * 60000; //minutes
            tId = window.setTimeout(function() {
                chrome.runtime.sendMessage({
                    cmd: "TimeOutExpired"
                }, {});
            }, data);
        });
    }
});
```

