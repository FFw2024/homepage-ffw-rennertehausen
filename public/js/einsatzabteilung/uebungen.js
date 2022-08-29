const searchParams = window.location.search;

const urlBase = document.head.baseURI;
const contentElement = document.getElementById('content');

function getData() {
  const init = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Referrer: `${urlBase}einsatzabteilung/uebungen.html`
    },
    mode: 'no-cors'
  };

  return fetch(`${urlBase}data/exercises.json`, init).then(res => {
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
    const id = values.get('id');
    const year = id.substring(0, 4);

    getData()
        .then(data => data[year].find(item => item.id == id))
        .then(item => {
          document.getElementById('title').textContent = `Übung: ${item.title}`;

          const lines = item.description.split('\n');
          lines.forEach(line => {
            const element = document.createElement('p');
            element.textContent = line;

            contentElement.appendChild(element);
          });
        })
  }
} else {
  function getCard(item) {
    return `
        <div class="col">        
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img class="img-fluid rounded-start" src="${
        item.image}" />                     
                    </div>
                    <div class="card-body col-md-8">
                        <h5 class="card-title">${item.title}</h5>
                        <a class="card-link stretched-link" href="einsatzabteilung/uebungen.html?id=${
        item.id}"></a>
                    </div>
                </div>
            </div>   
        </div>     
          `;
  }

  getData().then(data => {
    contentElement.innerHTML = Object.entries(data)
                                   .reverse()
                                   .map(([year, exercises]) => {
                                     return `
                                        <section>
                                            <h3>${year}</h3>
                                            <div class="row row-cols-md-2 g-2 m-2">
                                                
                                                ${
                                         exercises.map(getCard).join('')}

                                            </div>                                            
                                        </section>
                                        `;
                                   })
                                   .join('');
  })
}
