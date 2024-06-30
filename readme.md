# Moin Commands Chrome Extension
- Add small floating button to right handside corner when clicked open swal popup with commands list
- Add context menu Search with (Youtube, Google, ...)

## How to use
### Build injected main.js

1. Run `npm start` in the root directory of the chrome extension.


### Install the extension

1. Open Chrome
2. Go to `chrome://extensions` in the URL bar
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the directory where you have the extension files


### Adding custom commands

To add a custom command, you can add it to the `modules/app.js` file. You will need to add a new command object to the `commands` array.

