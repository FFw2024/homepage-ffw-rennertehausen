function getCard(news) {
  return `
    <li key="${news.id}">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.icon}" class="img-fluid rounded-start" />
          </div>
          <div class="col-md-8 card-body">
            <div class="d-flex flex-column h-100>
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text overflow-hidden">${item.description}</p>
              <a class="card-link mt-auto align-self-end">weiterlesen</a>
            </div>  
          </div>
        </div>
      </div>
    </li>
  `;
}

const init = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Referrer:
        'files:///home/philipp/Repos/homepage-ffw-rennertehausen/public/aktuelles.html'
  },
  mode: 'no-cors'
};

fetch(
    'file:///home/philipp/Repos/homepage-ffw-rennertehausen/public/data/news.json',
    init)
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res.statusText;
      }

      return res.json();
    })
    .then(createList);

function createList(json) {
  let newsList = document.getElementById('newsList');

  if (newsList) {
    newsList.innerHTML =
        json.filter((element) => element.display ?? true).map(getCard).join('');
  }
}