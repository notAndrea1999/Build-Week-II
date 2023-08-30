const URL = " https://striveschool-api.herokuapp.com/api/deezer/artist/";

const artistId = new URLSearchParams(window.location.search).get("artistId");

console.log("artistId: ", artistId);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "347ef859a8msh40eb9265293372cp1dd2b6jsn8a5bcce294cd",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  try {
    // Funzione che popola l'intestazione della pagina (Artist Card)

    const resp = await fetch(URL + artistId, options);

    const artist = await resp.json();

    const artistCard = document.getElementById("artistCard");
    artistCard.innerHTML += `<div class="artist-body d-flex flex-column justify-content-end">
    <p class="title-artist-p mt-5 ps-3 mb-1"><i class="bi bi-patch-check-fill"></i> Arista verificato</p>
    <h1 id="artistMainTitle" class="main-title-artist mt-3 ps-3">${artist.name}</h1>
    <div class="avatar d-flex align-items-center">
      <p id="numbOfFan" class="title-artist-p mt-5 ps-1">${new Intl.NumberFormat().format(
        artist.nb_fan
      )} ascoltatori mensili</p>
    </div>
  </div>`;

    // Funzione che modifica dinamicamente il background di artist card

    artistCard.style.backgroundImage = "url(" + artist.picture_xl + ")";
    console.log(artistCard.style.backgroundImage);

    // Recupero brani popolari dalla tracklist

    const respTrack = await fetch(artist.tracklist, options);
    const tracklist = await respTrack.json();

    // Foreach sui brani popolari

    let counter = 1;
    tracklist.data.forEach((data) => {
      const songs = document.getElementById("songs");
      songs.innerHTML += `<div class="song d-flex align-items-center mb-3 mb-3">
    <p class="text-light">${counter}</p>
    <div class="song-info ms-3 d-flex flex-grow-1">
      <img class="artist-page-img-little" src="${data.album.cover_medium}" alt="" />
      <h3 class="text-light">${data.title}</h3>
    </div>
    <p class="text-light me-5 text-end">${data.rank}</p>
    <p class="text-light ms-4">${Math.floor(data.duration / 60)} : ${data.duration % 60} </p>
  </div>`;

      counter++;
    });
  } catch (error) {
    console.log(error);
  }
};
