import { addCommand } from "../commands.js";

addCommand("All links", function({reOpenMain}){
    let ass = document.querySelectorAll("a");
    let assArr = Array.from(ass);
    Swal.fire({
        type: 'info',
        html: `<pre style=""><code>${assArr.map(a=>`[${a.innerText}](${a.href})`).join("\n\n")}</code></pre>`
    });
}, "Get Info");