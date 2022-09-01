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

    const main = document.getElementsByTagName('main')[0];

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#imageGallery');
    button.innerText = 'Bildergalerie';

    main.appendChild(button);

    const imageGallery = document.createElement('div');
    imageGallery.setAttribute('id', 'imageGallery');
    imageGallery.setAttribute('data-image-src', 'img/exercises');

    main.appendChild(imageGallery);

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'js/misc/imageGallery.js';

    main.appendChild(script);
  }
} else {
  function createCards(parent, exercises) {
    const cardTemplate = document.getElementById('templateCard').content;

    exercises.forEach((exercise) => {
      const card = document.importNode(cardTemplate, true);

      if (exercise.image) {
        const imageElement = card.querySelector('div.col-md-4 img.img-fluid');
        imageElement.src = exercise.image;
      }

      const hearderElement = card.querySelector('div.col-md-8 h5.card-title');
      hearderElement.textContent = exercise.title;

      const linkElement = card.querySelector('div.col-md-8 a.card-link');
      linkElement.href =
          `${urlBase}einsatzabteilung/uebungen.html?id=${exercise.id}`;

      parent.appendChild(card);
    })
  }

  getData().then(
      data => {Object.entries(data).reverse().forEach(([year, exercises]) => {
        const section = document.createElement('section');
        contentElement.appendChild(section);

        const header = document.createElement('h3');
        header.textContent = year;
        section.appendChild(header);

        const list = document.createElement('div');
        list.classList.add('row', 'row-cols-md-2', 'g-2', 'm-2');
        section.appendChild(list);

        createCards(list, exercises);
      })});
}
