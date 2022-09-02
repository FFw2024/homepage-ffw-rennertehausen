const searchParams = window.location.search;

const urlBase = document.head.baseURI;

function getData() {
  const init = {
    method: 'GET',
    headers: {Accept: 'application/json', Referrer: `${urlBase}aktuelles.html`},
    mode: 'no-cors'
  };

  return fetch(`${urlBase}data/news.json`, init).then(res => {
    if (!res.ok) {
      console.log(res);
      throw res.statusText;
    }

    return res.json();
  })
}

if (searchParams) {
  const entries = searchParams.substring(1).split('&');
  var values = new Map();

  entries.forEach(entry => {
    const parts = entry.split('=');
    values.set(parts[0], parts[1]);
  });

  if (values.has('id')) {
    const searchId = values.get('id');

    getData()
        .then(data => data.find(item => item.id == searchId))
        .then(item => {
          document.getElementById('title').innerText = item.title;
          document.getElementById('newsList').className += ' invisible';

          const contentElement = document.getElementById('content');
          contentElement.className = '';

          const year = item.id.substring(0, 4);

          fetch(`${urlBase}aktuelles/${year}/${item.id}.html`, {
            method: 'GET',
            headers: {
              Accept: 'text/html',
            },
            mode: 'no-cors'
          })
            .then(res => {
              if (!res.ok) {
                console.log(res);
                throw res.statusText;
              }

              return res.text();
            })
            .then(html => {
              let parser = new DOMParser();

              const doc = parser.parseFromString(html, 'text/html');
              doc.body.childNodes.forEach(node => contentElement.appendChild(node));
            });
        });
  }

} else {
  function createCards(parent, news) {
    const template = document.getElementById('templateCard').content;

    news.forEach((item) => {
      const link = `${urlBase}aktuelles.html?id=${item.id}`;

      const card = document.importNode(template, true);

      if (item.image) {
        const img = card.querySelector('div.col-md-4 img');
        img.src = item.image;
      }

      const header = card.querySelector('div.col-md-8 h5.card-title');
      header.innerText = item.title;

      const desc = card.querySelector('div.col-md-8 p.card-text.overflow-hidden');
      desc.innerText = item.description;

      const cardLink = card.querySelector('div.col-md-8 a.card-link');
      cardLink.href = link;

      parent.appendChild(card);
    });
  }

  getData().then(createList);

  function createList(json) {
    let newsList = document.getElementById('newsList');

    if (newsList) {
      createCards(newsList, json);
    }
  }
}
