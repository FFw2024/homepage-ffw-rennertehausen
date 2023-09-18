const table = document.getElementById("tableBody")

function createRow(date, time, desc) {
    const row = document.createElement('tr');

    const dateCol = document.createElement('td');
    dateCol.innerText = date;
    row.appendChild(dateCol);

    const timeCol = document.createElement('td');
    timeCol.innerText = time;
    row.appendChild(timeCol);

    const descCol = document.createElement('td');
    descCol.innerText = desc;
    row.appendChild(descCol);

    table.appendChild(row);
}

const dateFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
};

const timeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit"
};

fetch('data/nextExercises.json')
    .then(async (res) => {
        const data = await res.json();

        data.filter((item) => new Date(item.date) > Date.now()).forEach((item) => {
            const date = new Date(item.date);

            createRow(date.toLocaleDateString('de-de', dateFormatOptions), date.toLocaleTimeString('de-de', timeFormatOptions) + " Uhr", item.desc)
        });
    });
