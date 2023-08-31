const URL = " https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "347ef859a8msh40eb9265293372cp1dd2b6jsn8a5bcce294cd",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const caricamento = async () => {
  try {
    event.preventDefault();
    const row = document.getElementById("row");
    const row2 = document.getElementById("row-2");
    row.innerHTML = "";
    row2.innerHTML = "";

    const resp = await fetch(URL1, options);
    // console.log(resp);

    const infos = await resp.json();
    console.log(infos);

    const data = infos.data.slice(0, 6);
    const data2 = infos.data.slice(0, 5);

    // console.log(data);
    // console.log(data2);

    data.forEach((data) => {
      console.log(data.album.title);
      const col = document.createElement("div");
      col.className = "col col-lg-4 col-md-6 col-6 gy-2";
      col.innerHTML = `
       <div class="card border border-0 d-flex flex-row">
       <a href="./album.html?albumId=${data.album.id}"><img class="image-type-1 img-card-top" src="${data.album.cover_medium}" alt="" /></a>
       <div class="card-body"><a href="./album.html?albumId=${data.album.id}" class="text-light">${data.album.title}</a></div>
       </div>
       `;
      row.appendChild(col);

      //   const firstAlbum = document.getElementById("firstAlbum-body");
      album.innerHTML = `
      <div class="img pe-3 d-lg-inline-flex d-md-inline-flex d-none">
      <a href="./album.html?albumId=${data.album.id}"><img src="${data.album.cover_medium}" alt="" /></a>
      </div>
      <div class="album-body d-lg-block d-md-block d-none">
      <h3>${data.album.title}</h3>
      <h1>${data.title}</h1>
      <p><a class="text-light" href="./artistpage.html?artistId=${data.artist.id}">${data.artist.name}</a></p>
      <p>Ascolta il nuovo brano di ${data.artist.name}</p>
      <div class="buttons d-flex align-items-center">
        <button onclick="goPlayer(event)" class="btn btn-success rounded-pill play" type="button">Play</button>
        <button class="btn btn-primary rounded-pill bg-black salva" type="buton">Salva</button>
        <button class="btn rounded-pill bg-black dots" type="buton">...</button>
      </div>
    </div>

      `;
    });

    data2.forEach((data2) => {
      const col2 = document.createElement("div");
      col2.className = "col gy-3";
      col2.innerHTML = `
    <div class="card-body-2 card border border-0 ">
    <a href="./album.html?albumId=${data2.album.id}" class="text-light"><img src="${data2.album.cover_medium}" class="card-img-top" alt="..." /></a>
      <div class=" card-body-text text-light">
        <h5 class="card-title"><a href="./album.html?albumId=${data2.album.id}" class="text-light">${data2.album.title}</a></h5>
        <p class="card-text text-secondary"><a class="text-light" href="./artistpage.html?artistId=${data2.artist.id}">${data2.artist.name}</a></p>
      </div>
    </div>
      `;
      row2.appendChild(col2);
    });
  } catch (error) {
    console.log(error);
  }
};

// ---------------Dinamic Fetch---------------------

// const showSearchButton = document.getElementById("showSearchButton");
// showSearchButton.addEventListener("click", function () {
//   //   event.preventDefault();
//   console.log("hai cliccato");
// });

const searchContainer = document.getElementById("searchContainer");

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value;
  URL1 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchTerm}`;

  console.log("Hai cercato:", searchTerm);
  console.log("URL aggiornato:", URL1);

  caricamento();
});

const song = document.querySelector(".song");
const goPlayer = async (event) => {
  const response = await fetch(URL1, options);
  console.log(response);

  const data = await response.json();
  console.log(data);

  const fullData = data.data[5];
  console.log(fullData);

  song.innerHTML = `
    <div class="songImgContainer d-flex ms-3 my-3">
              <img  src="${fullData.album.cover_medium}" />
        </div>
        <div class="d-flex flex-column my-2 mx-3">
              <h6 class="text-white mb-0">${fullData.title}</h6>
              <p class="text-white-50 mb-0">${fullData.artist.name}</p>
        </div>
    <div><i class="bi bi-heart text-white-50 ms-2"></i></div>
    `;
  console.log(fullData);
};
