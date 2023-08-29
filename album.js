const albumId = new URLSearchParams(window.location.search).get("albumId");
const URL = " https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;
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
  albumCard.innerHTML = `
    <img src="${data.cover_medium}" alt="" />
          <div class="album-body-2 d-flex flex-column justify-content-end">
            <h3 class="mt-5 ps-3 text-light">Album</h3>
            <p class="mt-3 ps-3 text-light">${data.title}</p>
            <div class="avatar d-flex align-items-center">
              <img class="mt-3 ms-3 rounded-circle" src="${data.cover_small}" alt="" />
              <h3 class="mt-3 ps-1 text-light">${data.artist.name} • ${data.release_date} • ${
    data.nb_tracks
  } brano/i, ${parseInt(data.duration / 60)} min </h3>
            </div>
</div> 
  `;

  const tracks = data.tracks.data;
  console.log(tracks);

  let counter = 1;
  tracks.forEach((track) => {
    const songs = document.getElementById("songs");
    songs.innerHTML += `
      <div class="song d-flex align-items-center">
      <p class="text-light">${counter}</p>
      <div class="song-info ms-3 me-auto ">
      <h3 class="text-light ">${track.title}</h3>
      <p class="text-secondary fw-lighter ">${track.artist.name}</p>
      </div>
      <p class="ascolti text-light  ">${track.rank}</p>
      <p class="text-light ms-4 ">${(track.duration / 60).toFixed(1)} </p>
      </div>
      `;
    counter++;
    console.log(track);
  });
};
