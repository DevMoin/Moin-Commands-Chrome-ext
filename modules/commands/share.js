import { sufiCommands, addCommand } from '../commands.js';

addCommand("QR", function ({ reOpenMain }) {
    let url =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        window.location.href;
    Swal.fire({
        icon: "info",
        html: `<iframe class="sufi-frame" src="${url}" />`,
        didDestroy: reOpenMain,
    });
}, "Share");

addCommand("Website Qr", function ({ reOpenMain }) {
    let url =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        window.location.href;
    Swal.fire({
        html: `<iframe class="sufi-frame" src="${url}" />`,
        // didDestroy: reOpenMain,
    });
}, "Share");

addCommand("ShortURL", function ({ reOpenMain }) {
    function ShortURLCommand() {
        var shortURLPattern = /https?:\/\/[^\s]+/gi;
        var pageContent = document.body.innerHTML;
        var shortURLs = pageContent.match(shortURLPattern);
        Swal.fire({
            html: `<textarea>${shortURLs.join("\n")}</textarea>`,
            // didDestroy: reOpenMain
        });
    }
    ShortURLCommand();
}, "Share");