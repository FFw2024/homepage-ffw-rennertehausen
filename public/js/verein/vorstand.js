function getCard(item) {
//   return `
//     <div class="col">
//     <div class="card m-2">
//         ${item.image ? `<img class="card-img-top" src="${item.image}" />` : ''}
//         <div class="card-body">
//             <h5>${item.role}</h5>
//             <p class="card-text">${item.name}</p>
//         </div>
//     </div>
// </div>
//     `;

  const parent = document.createElement('div');
  parent.classList.add('col');
  
  const card = document.createElement('div');
  card.classList.add('card', 'm-2');
  parent.appendChild(card);

  if(item.image) {
    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = item.image;

    card.appendChild(image);
  }

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const header = document.createElement('h5');
  header.classList.add('card-title');
  header.textContent = item.role;
  cardBody.appendChild(header);

  const name = document.createElement('p');
  name.classList.add('card-text');
  name.textContent = item.name;
  cardBody.appendChild(name);

  return parent;
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
      const vorstand = document.getElementById('vorstand');
      data.vorstand.forEach((item) => vorstand.appendChild(getCard(item)));

      const wehrfuerhung = document.getElementById('wehrfuehrung');
      data.wehrfuehrung.forEach((item) => wehrfuerhung.appendChild(getCard(item)));
      
      const jugendfeuerwehr = document.getElementById('jugendfeuerwehr');
      data.jugendfeuerwehr.forEach((item) => jugendfeuerwehr.appendChild(getCard(item)));
    });