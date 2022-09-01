const urlBase = document.head.baseURI;

// get latest alarm
fetch(`${urlBase}data/alarms.json`, {
  method: 'GET',
  headers: {Accept: 'application/json', Referrer: `${urlBase}index.html`}
})
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res.statusText;
      }

      return res.json();
    })
    .then(alarms => {
      const year = Object.entries(alarms)
                       .map(([year, _]) => Number.parseInt(year))
                       .reduce((prev, curr) => prev < curr ? curr : prev);
      
      return alarms[year].reduce((prev, curr) => {
        const prevTime = new Date(prev.time);
        const currTime = new Date(curr.time);

        return prevTime < currTime ? curr : prev;
      });
    })
    .then(alarm => {
      const card = document.getElementById('lastAlarmCard');

      const img = card.querySelector('div img.rounded-start');
      img.src = alarm.image;

      const title = card.querySelector('div h5.card-title');
      title.textContent = alarm.title;

      const subtitle = card.querySelector('div h6.card-subtitle');
      subtitle.textContent = alarm.word;
    })

// get events
fetch(`${urlBase}data/events.json`, {
  method: 'GET',
  headers: {Accept: 'application/json', Referrer: `${urlBase}index.html`}
})
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res.statusText;
      }

      return res.json();
    })
    .then(events => {
      const template = document.getElementById('eventTemplate');
      const list = document.getElementById('eventsCard')
                       .querySelector('div.card-body div.list-group');

      events.forEach(event => {
        if (event.display == undefined || event.display) {
          var a = document.importNode(template.content, true);
          const link = a.querySelector('a');
          link.setAttribute('href', event.link);

          const strong = a.querySelector('strong');
          strong.textContent = event.time;

          const span = a.querySelector('span');
          span.textContent = ` ${event.title}`;

          list.appendChild(a);
        }
      });
    })

// get news
fetch(`${urlBase}data/news.json`)
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res.statusText;
      }

      return res.json();
    })
    .then(news => {
      const container = document.getElementById('newsList');
      const template = container.querySelector('template');

      var i = 0;
      while (i < news.length && i < 5) {
        const item = news[i];

        var node = document.importNode(template.content, true);

        if (item.image) {
          const img = node.querySelector('img.img-fluid');
          img.src = item.image;
        }

        const title = node.querySelector('h5.card-title');
        title.textContent = item.title;

        const desc = node.querySelector('p.card-text');
        desc.textContent = item.description;

        const a = node.querySelector('a.card-link');
        a.setAttribute('href', `aktuelles.html?id=${item.id}`)

        container.appendChild(node);

        i++;
      }
    })
