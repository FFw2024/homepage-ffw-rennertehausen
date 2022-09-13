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

    const header = document.createElement('h3');
    header.classList.add('text-muted');
    header.textContent = alarm.word;
    contentElement.appendChild(header);

    // row for the table
    const divRowTable = document.createElement('div');
    divRowTable.classList.add('row');
    contentElement.appendChild(divRowTable);

    // div to align table on left side
    const tableDiv = document.createElement('div');
    divRowTable.appendChild(tableDiv);

    // table with information about the alarm
    const table = document.createElement('table');
    table.classList.add('table', 'table-borderless', 'w-auto');
    tableDiv.appendChild(table);

    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    function createTableRow(title, desc) {
      const tableRow = document.createElement('tr');

      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = title;
      th.classList.add('pe-4');
      tableRow.appendChild(th);

      const td = document.createElement('td');
      td.innerHTML = desc;
      tableRow.appendChild(td);

      tableBody.appendChild(tableRow);
    }

    createTableRow('Einsatzort', alarm.location);
    createTableRow('Einsatzzeit', new Date(alarm.time).toLocaleString('de-de', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }));
    createTableRow('Einsatzkräfte', alarm.participants);
    createTableRow('Fahrzeuge', alarm.vehicles);
    if (alarm.duration) {
      createTableRow('Einsatzdauer', alarm.duration);
    }

    const divDesc = document.createElement('div');
    divDesc.classList.add('row');

    alarm.description.split('\n').forEach(line => {
      const p = document.createElement('p');
      // p.classList.add('mb-0');
      p.innerHTML = line;

      divDesc.appendChild(p);
    });
    contentElement.append(divDesc);

    if (alarm.links) {
      alarm.links.forEach((link) => {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('d-flex', 'justify-content-end');

        const a = document.createElement('a');
        a.classList.add('text-decoration-none')
        a.href = link.href;
        a.innerText = link.desc;
        a.target = "_blank";
        a.rel = "noreferrer noopener";

        linkDiv.appendChild(a);
        divDesc.appendChild(linkDiv);
      });
    }
  });
    
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
