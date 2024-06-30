// Define the search engines with their URLs and colors
const searchers = [
    {
        title: "Google",
        url: "https://www.google.com/search?q=[text]",
        color: "#4285F4",
    },
    {
        title: "youtube",
        url: "https://www.youtube.com/results?search_query=[text]",
        color: "#FF0000",
    },
    {
        title: "duckduckgo",
        url: "https://duckduckgo.com/?q=[text]",
        color: "#cc44aa",
    },
    {
        title: "facebook",
        url: "https://www.facebook.com/search/?q=[text]",
        color: "#3b5998",
    },
    {
        title: "twitter",
        url: "https://twitter.com/search?q=[text]",
        color: "#1DA1F2",
    },
    {
        title: "pinterest",
        url: "https://www.pinterest.com/search/pins/?q=[text]",
        color: "#E60023",
    },
    {
        title: "instagram",
        url: "https://www.instagram.com/explore/tags/[text]/",
        color: "#E1306C",
    },
    {
        title: "linkedin",
        url: "https://www.linkedin.com/search/results/all/?keywords=[text]",
        color: "#0077B5",
    }
];

// Listen for the custom event and handle it

// Listen for the custom event and handle it
document.addEventListener('moinSearchEvent', (e) => {
    let text = e.detail.selectedText;
    let buttons = "<ul style='list-style-type: none; padding: 0; display: flex; flex-wrap: wrap;'>";

    searchers.forEach(searcher => {
        // Create anchor tags for each search engine
        buttons += `
            <li style="margin: 5px 0;">
                <a href="${searcher.url.replace('[text]', encodeURIComponent(text))}" target="_blank" 
                   style="background-color:${searcher.color}; color:white; display: inline-block; 
                          margin: 5px; padding: 10px; border:none; border-radius:5px; text-decoration: none;">
                    ${searcher.title}
                </a>
            </li>`;
    });
    buttons += "</ul>";

    Swal.fire({
        title: 'Search in',
        html: buttons,
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Close'
    });
});