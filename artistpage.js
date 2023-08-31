const URL = " https://striveschool-api.herokuapp.com/api/deezer/artist/";

const artistId = new URLSearchParams(window.location.search).get("artistId");

let tracklistEXT;

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
    <p class=" d-none d-md-block title-artist-p mt-5 ps-3 mb-1"><i class="bi bi-patch-check-fill"></i> Arista verificato</p>
    <h1 id="artistMainTitle" class="main-title-artist mt-5 ps-3">${artist.name}</h1>
    <div class="avatar d-flex align-items-center">
      <p id="numbOfFan" class="title-artist-p mt-5 ps-3">${new Intl.NumberFormat().format(
        artist.nb_fan
      )} ascoltatori mensili</p>
    </div>
  </div>`;

    // Funzione che modifica dinamicamente il background di artist card
    const backgroundCont = document.getElementById("backgroundCont");
    backgroundCont.style.backgroundImage = "url(" + artist.picture_xl + ")";

    // Recupero brani popolari dalla tracklist

    const respTrack = await fetch(artist.tracklist, options);
    const tracklist = await respTrack.json();

    // Foreach sui brani popolari

    let counter = 1;
    // lo assegno anche alla variabile
    tracklistEXT = tracklist.data;
    tracklist.data.forEach((data) => {
      const songs = document.getElementById("songs");
      songs.innerHTML += `<div class="song d-flex align-items-center mb-3 mb-3">
    <p class="text-light">${counter}</p>
    <div class="song-info ms-3 d-flex me-auto">
      <img class="artist-page-img-little" src="${data.album.cover_medium}" alt="" />
      <h3 onclick= "playerDinamic(${data.id})" class="text-light"><a href="javascript:void(0)" class="text-light">${
        data.title
      }</a></h3>      
    </div>
    <p class="text-light me-5 text-end">${data.rank}</p>
    <p class="text-light ms-5">${(data.duration / 60).toFixed(1)} </p>
  </div>`;

      counter++;
    });
  } catch (error) {
    console.log(error);
  }
};

// Funzione player dinamico
function playerDinamic(input) {
  // Cerco la traccia dove si è cliccato
  const found = tracklistEXT.find((element) => element.id === input);

  const player = document.getElementsByClassName("player-container")[0];
  player.innerHTML = `<div class="playNav player-container d-flex justify-content-between">
  <div class="song d-flex align-items-center">
    <div class="songImgContainer d-flex ms-3 my-3">
      <img class="img-fluid" src="${found.album.cover_medium}" />
    </div>
    <div class="d-flex flex-column my-2 mx-3">
      <h6 class="text-white mb-0">${found.title}</h6>
      <p class="text-white-50 mb-0">${found.contributors[0].name}</p>
    </div>
    <div><i class="bi bi-heart text-white-50 ms-2"></i></div>
  </div>
  <!-- --------play------ -->
  <div class="play d-flex-column">
    <div class="buttonContainer d-flex justify-content-center align-items-center">
      <i class="bi bi-shuffle text-success mx-1"></i>
      <i class="bi bi-skip-start-fill text-white-50 mx-1"></i>
      <i class="fs-4 bi bi-play-circle-fill text-white mx-1"></i>
      <i class="bi bi-skip-end-fill text-white-50 mx-1"></i>
      <i class="bi bi-repeat text-success mx-1"></i>
    </div>
    <!-- ----------------- -->

    <div class="timing d-flex justify-content-between align-items-center">
      <p class="text-white-50 mb-0 pe-2">0:58</p>
      <div class="containerProgressBar">
        <div
          class="progress firstBar bg-secondary"
          role="progressbar"
          aria-label="Example 1px high"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style="height: 7px"
        >
          <div class="progress-bar bg-white" style="width: 25%"></div>
        </div>
      </div>

      <p class="text-white-50 mb-0 ps-2">3:34</p>
    </div>
  </div>
  <div class="volume d-flex align-items-center">
    <i class="bi bi-mic text-white-50 pe-2"></i>
    <i class="bi bi-list text-white-50 pe-2"></i>
    <i class="bi bi-speaker text-white-50 pe-2"></i>
    <i class="bi bi-volume-up text-white-50 pe-2"></i>
    <div class="containerProgressBar pe-2">
      <div
        class="progress volBar"
        role="progressbar"
        aria-label="Example 1px high"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style="height: 7px"
      >
        <div class="progress bg-white" style="width: 25%"></div>
      </div>
    </div>
    <i class="bi bi-arrows-fullscreen text-white-50 pe-2"></i>
  </div>
</div>`;
}
