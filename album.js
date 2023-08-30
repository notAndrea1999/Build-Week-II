const albumId = new URLSearchParams(window.location.search).get("albumId");
// const trackId = new URLSearchParams(window.location.search).get("trackId");

const URL = " https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;
// console.log(albumId);
// const URL2 = "https://deezerdevs-deezer.p.rapidapi.com/track/" + trackId;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "347ef859a8msh40eb9265293372cp1dd2b6jsn8a5bcce294cd",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  const resp = await fetch(URL, options);
  //   console.log(resp);
  const data = await resp.json();
  //   console.log(data);
  const albumCard = document.getElementById("album-card");

  const yearMonthDay = new Date(data.release_date);
  let year = yearMonthDay.getFullYear();
  console.log(year);

  albumCard.innerHTML = `
    <img src="${data.cover_medium}" alt="" />
    <div class="album-body-2 d-flex flex-column justify-content-end">
    <h3 class="mt-5 ps-3 text-light">Album</h3>
    <p class="mt-3 ps-3 text-light">${data.title}</p>
    <div class="avatar d-flex align-items-center">
    <img class="mt-3 ms-3 rounded-circle" src="${data.cover_small}" alt="" />
    <h3 class="mt-3 ps-1 text-light">${data.artist.name} • ${year} • ${data.nb_tracks} brano/i, ${parseInt(
    data.duration / 60
  )} min </h3></div>
   </div> `;

  const tracks = data.tracks.data;
  // console.log(tracks);

  let counter = 1;
  tracks.forEach((track) => {
    const songs = document.getElementById("songs");
    songs.innerHTML += `
      <div class="song d-flex align-items-center">
      <p class="text-light">${counter}</p>
      <div class="song-info ms-3 me-auto ">
      <a onclick="goToPLayer(event)"><h3 class="song-name text-light ">${track.title}</h3></a>
      <a><p class="text-secondary fw-lighter ">${track.artist.name}</p></a>
      </div>
      <p class="ascolti text-light  ">${track.rank}</p>
      <p class="text-light ms-4 ">${(track.duration / 60).toFixed(1)} </p>
      </div>
      `;
    counter++;
    // console.log(track);
  });
};

const song = document.querySelector(".song");
const goToPLayer = async (title) => {
  const resp = await fetch(URL, options);
  // console.log(resp);

  // console.log(trackId);

  const data = await resp.json();
  // console.log(data);

  const tracks = data.tracks.data;
  // console.log(tracks);

  console.log(title);
  tracks.forEach((track) => {
    // console.log(track);
    song.innerHTML = `
   <div class="songImgContainer d-flex ms-3 my-3">
             <img  src="${track.album.cover_medium}" />
       </div>
       <div class="d-flex flex-column my-2 mx-3">
             <h6 class="text-white mb-0">${title.target.innerText}</h6>
             <p class="text-white-50 mb-0">${track.artist.name}</p>
       </div>
   <div><i class="bi bi-heart text-white-50 ms-2"></i></div>
   `;
  });
};
