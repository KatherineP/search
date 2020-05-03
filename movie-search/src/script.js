const apiKey = '1da1496c';
let title;
let poster;
let year;
let imdbID;
let movieRating;
const div = document.querySelector('.carousel-container');

function getMovieInformation(movieFilter, page, key) {
  const url = `https://www.omdbapi.com/?s=${movieFilter}&page=${page}&apikey=${key}`;
  fetch(url)

    .then((response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${
          response.status}`);
        return;
      }
      response.json().then((data) => {
        for (let i = 0; i < 10; i++) {
          imdbID = data.Search[i].imdbID;

          const url2 = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

          fetch(url2)
            .then((response) => response.json())
            .then((data) => {
              const rating = data.Ratings[0].Value.split('/');
              movieRating = rating[0];

              const movieRelease = data.Released.split(' ');
              year = movieRelease[2];

              poster = data.Poster;

              title = data.Title;

              id = data.imdbID;

              const card = createMovieCard(`https://www.imdb.com/title/${id}/`, title, poster, year, movieRating);
              div.innerHTML += card;

              if (i === 9) {
                createCarousel();
              }
            });
        }
      });
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
}

getMovieInformation('movie', 1, apiKey);


function createMovieCard(id, title, image, year, rating) {
  return `<div class="card"><a class="card-header" href="${id}" 
    target="_blank">${title}</a><img class="movie-img" src="${image}" alt="7"><div 
    class="card-footer">${year}</div><div class="imdb-rating"><span>${rating}</span></div></div>`;
}

function createCarousel() {
  $(document).ready(() => {
    $('.owl-carousel').owlCarousel({
      loop: true,
      navText: ['<img class="prev-arrow" src=\"src/assets/prev.svg\">', '<img class="next-arrow" src=\"src/assets/next.svg\">'],
      items: 3,
      nav: true,
      animateOut: 'fadeOut',
      margin: 80,
      smartSpeed: 500,
      center: true,
    });
  });
}
