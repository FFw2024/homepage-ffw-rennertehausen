fetch('html/menu.html')
    .then(res => {
        if (!res.ok) {
            throw res.statusCode;
        }

        return res.text()
    })
    .then(str => {
        var parser = new DOMParser();
        var html = parser.parseFromString(str, "text/html")

        var header = document.getElementsByTagName('header')[0]
        if (!header) {
            header = document.createElement('header')
            header.classList.add('container-fluid', 'sticky-top')

            var body = document.body
            body.insertBefore(header, body.firstChild);
        }

        header.appendChild(html.body.firstChild);
    })
