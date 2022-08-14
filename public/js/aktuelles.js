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
          }).then(res => {
            if (!res.ok) {
              console.log(res);
              throw res.statusText;
            }

            return res.text();
          }).then(html => contentElement.innerHTML = html);
        });
  }

} else {
  function getCard(news) {
    const link = `${urlBase}aktuelles.html?id=${news.id}`;

    let result = `
      <div class="col">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              ${
        news.icon ?
            `<img src="${news.icon}" class="img-fluid rounded-start" />` :
            ``}
            </div>
            <div class="col-md-8 card-body">
              <div class="d-flex flex-column h-100">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text overflow-hidden">${news.description}</p>
                <a class="card-link mt-auto align-self-end" href="${
        link}">weiterlesen</a>
              </div>  
            </div>
          </div>
        </div>
      </div>
    `;

    return result;
  }

  getData().then(createList);

  function createList(json) {
    let newsList = document.getElementById('newsList');

    if (newsList) {
      newsList.innerHTML = json.filter((element) => element.display ?? true)
                               .map(getCard)
                               .join('');
    }
  }
}
