const URL = " https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "347ef859a8msh40eb9265293372cp1dd2b6jsn8a5bcce294cd",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  try {
    const resp = await fetch(URL, options);
    // console.log(resp);

    const infos = await resp.json();
    console.log(infos);

    const data = infos.data.slice(0, 6);
    const data2 = infos.data.slice(0, 5);

    console.log(data);
    console.log(data2);

    data.forEach((data) => {
      console.log(data.album.title);
      const row = document.getElementById("row");
      const col = document.createElement("div");
      col.className = "col col-lg-4 col-md-6 gy-2";
      col.innerHTML = `
       <div class="card border border-0 d-flex flex-row">
       <a href="./album.html?albumId=${data.album.id}"><img class="image-type-1 img-card-top" src="${data.album.cover_medium}" alt="" /></a>
       <div class="card-body"><a href="./album.html?albumId=${data.album.id}" class="text-light">${data.album.title}</a></div>
       </div>
       `;
      row.appendChild(col);

      const firstAlbum = document.getElementById("firstAlbum-body");
      album.innerHTML = `
      <div class="img pe-3">
      <img src="${data.album.cover_medium}" alt="" />
      </div>
      <div class="album-body">
      <h3>${data.album.title}</h3>
      <h1>${data.title}</h1>
      <p><a class="text-light" href="./artistpage.html?artistId=${data.artist.id}">${data.artist.name}</a></p>
      <p>Ascolta il nuovo brano di ${data.artist.name}</p>
      <div class="buttons d-flex align-items-center">
        <button class="btn btn-success rounded-pill play" type="button">Play</button>
        <button class="btn btn-primary rounded-pill bg-black salva" type="buton">Salva</button>
        <button class="btn rounded-pill bg-black dots" type="buton">...</button>
      </div>
    </div>

      `;
    });

    data2.forEach((data2) => {
      const row2 = document.getElementById("row-2");
      const col2 = document.createElement("div");
      col2.className = "col gy-3";
      col2.innerHTML = `
    <div class="card-body-2 card border border-0 ">
      <img src="${data2.album.cover_medium}" class="card-img-top" alt="..." />
      <div class="card-body card-body-text text-light">
        <h5 class="card-title">${data2.album.title}</h5>
        <p class="card-text text-secondary">
          ${data2.artist.name}
        </p>
      </div>
    </div>
      `;
      row2.appendChild(col2);
    });
  } catch (error) {
    console.log(error);
  }
};
