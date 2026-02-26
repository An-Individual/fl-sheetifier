# Fallen London Sheetifier

Sheetifier is a simple browser extension for the game Fallen London that adds a button to the Myself page that lets you save your character data to a CSV file. The export only includes your character's qualities (the contents of the Myself and Possessions tabs). While it primarily contains simple level information the "name" column will include any names you've given to your companions and other game objects.

![A picture of the Fallen London Myself page with an "Export to CSV" button added to it.](https://github.com/An-Individual/images/blob/main/sheetifier.png?raw=true)

Per the [Community Extensions Policy](https://community.failbettergames.com/t/fallen-london-community-extensions/12505), it does not make requests to the API. Instead, it adds hooks to the Fallen London page that let it peek at the game's existing API requests, which it uses to keep a record of the charater data for export when the button is pressed.

**REMINDER:** This is an unsupported 3rd party extension. If you're experiencing issues with the game remove the extension, refresh the page, and re-check your issue before contacting support.

## Building and Running the Extension

To build the extension you'll need to install [Node.js](https://nodejs.org). This was built against version 24.13.1, but the latest version should also work. I'm not certain of the minimum version, but many older versions are also likely fine.

Next, head to the repository's local directory and run:

> npm install

This will install the extension's dependencies. Primarily `webpack`. With the dependencies installed you should now be able to run:

> npm run build

This will cause `webpack` to bundle up the code in the `/src` folder and dump it into the `/extension` folder as `sheetifier.js`. It also creates `sheetifier.js.map`. With that in place you can now load the extension into your browser of choice. The extension should run in Firefox, Chrome, and Chrome-adjacent browsers like Edge. The exact steps you need to take depend on the browser. Here are instructions for [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) and [Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).
