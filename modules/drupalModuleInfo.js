(function () {
    if(window.location.href.indexOf("https://www.drupal.org/project/") !== 0)
    {
        return;
    }
    let releases = document.querySelectorAll('.release [title="View release notes"]');
    releases.forEach(async function ($anchor) {
        let $parent = $anchor.closest(".release");
        let $myDiv = document.createElement("div");
        $myDiv.style.background = '#d7f8ff';
        $myDiv.style.padding = '10px';
        $myDiv.style.margin = '10px';
        $myDiv.innerHTML += "<h3>Basic Files</h3>";
        $parent.prepend($myDiv);
        let href = $anchor.href;
        let hrefInfo = href.match(/.+\/project\/(.+?)\/releases\/(.+)/i);
        let moduleName = hrefInfo[1];
        let version = hrefInfo[2];



        {
            let infoFile = getFileRawPath(moduleFileName(moduleName, "info.yml"), moduleName, version);
            let infoData = await fetchFromDrublock(infoFile);
            let details = document.createElement("details");
            details.style.border = "1px solid black";
            details.style.padding = "5px";
            details.innerHTML = `<summary style="
background: #7cbc48;
border: 2px solid #7cbc48;
color: white;
font: inherit;
font-size: 1em;
margin: 0.5em 0.5em 0 0;
padding: 0.1em 0.5em;
        ">
            ${moduleFileName(moduleName, "info.yml")}.yml 👇
        </summary>
        <pre style="
background: white;
padding:5px;
border: 1px solid #aaa;
margin: 5px 0px;
        "><code>${infoData}</code>
        </pre>
        `;
            $myDiv.append(details);
        }

    });

    async function fetchFromDrublock(filename) {
        let response = await fetch("https://drublock.com/drupalRaw/?path=" + filename);
        let data = await response.text();
        return data;
    }

    function moduleFileName(moduleName, ext) {
        return moduleName + "." + ext;
    }

    function getFileRawPath(fileName, moduleName, version) {
        //now handling it with https://drublock.com/drupalRaw/?path=getFileRawPath()
        // return `https://git.drupalcode.org/project/${moduleName}/-/raw/${version}/${fileName}?ref_type=tags`;
        return `${moduleName}/-/raw/${version}/${fileName}?ref_type=tags`;
    }
})();