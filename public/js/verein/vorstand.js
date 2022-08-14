function getCard(item) {
  return `
    <div class="col">
    <div class="card m-2">
        ${item.image ? `<img class="card-img-top" src="${item.image}" />` : ''}
        <div class="card-body">
            <h5>${item.role}</h5>
            <p class="card-text">${item.name}</p>
        </div>
    </div>
</div>
    `;
}

fetch(`${document.head.baseURI}data/vorstand.json`)
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res.statusText;
      }

      return res.json();
    })
    .then(data => {
      document.getElementById('vorstand').innerHTML =
          data.vorstand.map(getCard).join('');

      document.getElementById('wehrfuehrung').innerHTML =
          data.wehrfuehrung.map(getCard).join('');

      document.getElementById('jugendfeuerwehr').innerHTML =
          data.jugendfeuerwehr.map(getCard).join('');
    });