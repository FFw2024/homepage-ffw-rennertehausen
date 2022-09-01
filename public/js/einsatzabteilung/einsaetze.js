const searchParams = (new URL(window.location)).searchParams;

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

  return fetch(`${urlBase}data/alarms.json`, init).then(res => {
    if (!res.ok) {
      console.log(res);
      throw res.statusText;
    }

    return res.json();
  })
}

if (searchParams.has('id')) {
  const id = searchParams.get('id');
  const year = id.substring(0, 4);

  getData().then(data => data[year].find(item => item.id == id)).then(alarm => {
    document.getElementById('title').innerText = alarm.title;

    contentElement.innerHTML = `
            <h3 class="text-muted">${alarm.word}</h3>
            <div class="row">
              <div>
                <table className="table table-borderless w-auto">
                    <tbody>
                        <tr>
                            <th scope="row">Einsatzort</th>
                            <td>${alarm.location}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Einsatzzeit</th>
                            <td>${new Date(alarm.time).toLocaleString('de-de', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })} Uhr</td>
                        </tr>
                        ${
        alarm.participants ? `<tr>
                                <th scope='row'>Einsatzkr&#228;fte</th>
                                <td>${alarm.participants}</td>
                            </tr>` :
                             ''}
                        ${
        alarm.vehicles ? `<tr>
                                <th scope='row'>Fahrzeuge</th>
                                <td>${alarm.vehicles}</td>
                            </tr>` :
                         ''}
                    </tbody>
                </table>
              </div>
            </div>
            <div className='row'>
            ${
        alarm.description.split('\n')
            .map((line, index) => `<p class="mb-0">${line}</p>`)
            .join('')}
            </div>
          `;
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
  imageGallery.setAttribute('data-image-src', 'img/alarms');

  main.appendChild(imageGallery);

  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'js/misc/imageGallery.js';

  main.appendChild(script);
} else {
  function createCards(parent, alarms) {
    const cardTemplate = document.getElementById('templateCard').content;

    alarms.forEach(alarm => {
      const card = document.importNode(cardTemplate, true);

      if (alarm.image) {
        const img = card.querySelector('div.col-md-4 img.img-fluid');
        img.src = alarm.image;
      }

      const header = card.querySelector('div.col-md-8 h5.card-title');
      header.textContent = alarm.title;

      const subHeader =
          card.querySelector('div.col-md-8 h6.card-subtitle.text-muted');
      subHeader.textContent = alarm.word;

      const link = card.querySelector('div.col-md-8 a.card-link');
      link.href = `${urlBase}einsatzabteilung/einsaetze.html?id=${alarm.id}`;

      parent.appendChild(card);
    });
  }

  getData().then(data => {
    Object.entries(data).reverse().forEach(([year, alarms]) => {
      const section = document.createElement('section');

      const header = document.createElement('h3');
      header.innerText = year;
      section.appendChild(header);

      const list = document.createElement('div');
      list.classList.add('row', 'row-cols-md-2', 'g-2', 'm-2');

      createCards(list, alarms);
      section.appendChild(list);

      contentElement.appendChild(section);
    });
  })
}
