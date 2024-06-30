(function () {
    return;
    let div = document.createElement("div");
    div.innerHTML = `Hello world`;

    document.body.append(div);
    div.style.position = "fixed";
    div.style.backgroundColor = "grey";
    div.style.top = "100px";
    div.style.left = "100px";
    div.style.fontSize = "10px";
    div.style.color = "white";
    div.style.fontWeight = "bold";
    div.style.padding = "5px";

    document.addEventListener("mousemove", function (evt) {
        div.style.top = evt.clientY + "px";
        div.style.left = evt.clientX + "px";

    });
})();