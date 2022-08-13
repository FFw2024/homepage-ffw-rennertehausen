const searchParams = window.location.search;

const urlBase = 'https://feuerwehr-rennertehausen.de/';

function getData() {
  return fetch(`${urlBase}data/news.json`, init).then(res => {
    if (!res.ok) {
      console.log(res);
      // throw res.statusText;

      // debug only
      const data = [
        {
          title: 'Termine Sommer 2022',
          id: '2022_04',
          link: '/aktuelles/termineSommer2022',
          description:
              'Die Feuerwehren aus Haina und Dodenau haben uns zu ihren Festen eingeladen. Diesen Einladungen wollen wir gerne folgen.'
        },
        {
          title: 'Feuerwehr- und Heimatfest 2022',
          id: '2022_03',
          link: '/aktuelles/fest2022',
          icon: 'img/news/fest2022/banner.png',
          description:
              'In diesem Jahr ist es endlich wieder soweit! Das traditionelle Heimat- und Feuerwehrfest in Rennertehausen wird nach 3 Jahren mit Einschränkungen durch die Corona-Pandemie wieder stattfinden.'
        },
        {
          title: 'Osterfeuer 2022',
          id: '2022_02',
          icon: 'img/news/2022_02/2022_02_01.png',
          description:
              'In diesem Jahr laden wir euch wieder herzlich zu unserem Osterfeuer ein.',
          text:
              'In diesem Jahr laden wir euch wieder herzlich zu unserem Osterfeuer ein. Wie beim letzten Mal findet das Osterfeuer vor dem DGH statt.<br />Für Essen, Trinken und Feuer werden wir sorgen.<br />Das Feuer wird bei Einbruch der Dunkelheit angezündet.<br />Wir freuen uns auf euch!<br /><br />INFO:<br />Um eine Belästigung der Anwohner, durch zu starke Rauchentwicklung, zu vermeiden verbrennen wir ausschließlich trockenes Scheitholz. Eine Anlieferung von Strauchschnitt etc. ist daher leider nicht möglich.<br />Wir freuen uns, dass wir endlich wieder mit euch feiern können!'
        },
        {
          title: 'Einrichtung einer Unterkunft für Geflüchtete',
          id: '2022_01',
          icon: 'img/news/2022_01/2022_01_01.png',
          description:
              'Am Samstag, den 19.03.2022 haben wir zusammen mit den Feuerwehren der Gemeinde Allendorf zusammen eine Unterkunft für Geflüchtete aus der Ukraine eingerichtet.',
          text:
              'Am Samstag, den 19.03.2022 haben wir zusammen mit den Feuerwehren der Gemeinde Allendorf zusammen eine Unterkunft für Geflüchtete aus der Ukraine eingerichtet.<br />In dieser Unterkunft können bis zu 300 Geflüchtete untergebracht werden.'
        }
      ];

      return data;
    }

    return res.json();
  })
}

if (searchParams) {
  const entries = searchParams.substring(1).split('&');
  var values = new Map();

  for (const entry in entries) {
    const parts = entry.split('=');
    values.set(parts[0], parts[1]);
  }

  if (values.has('id')) {
    getData().then(
        data => {

        });
  }

} else {
  const init = {
    method: 'GET',
    headers: {Accept: 'application/json', Referrer: `${urlBase}aktuelles.html`},
    mode: 'no-cors'
  };

  function getCard(news) {
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
                <a class="card-link mt-auto align-self-end">weiterlesen</a>
              </div>  
            </div>
          </div>
        </div>
      </div>
    `;

    return result;
  }


  .then(createList);

  function createList(json) {
    let newsList = document.getElementById('newsList');

    if (newsList) {
      newsList.innerHTML = json.filter((element) => element.display ?? true)
                               .map(getCard)
                               .join('');
    }
  }
}
