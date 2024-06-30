(function () {
    document.addEventListener("selectionchange", function () {
        var selection = window.getSelection();
        // console.log(selection);
        console.log(selection.toString());
    });
})();