fetch('html/footer.html')
    .then(res => {
        if (!res.ok) {
            throw res.statusText;
        }

        return res.text();
    })
    .then(text => {
        var parser = new DOMParser();
        var footer = parser.parseFromString(text, 'text/html')

        document.body.appendChild(footer.body.firstChild);
    })