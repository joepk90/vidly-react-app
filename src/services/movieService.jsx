import http from './httpsService';

const apiService = 'http://localhost:3000/api/';

export function getMovies() {

    return http.get(apiService + 'movies');
}

// export function getMovie(id) {
//     return movies.find(m => m._id === id);
// }

// export function saveMovie(movie) {
//     let movieInDb = movies.find(m => m._id === movie._id) || {};
//     movieInDb._id = movie._id;
//     movieInDb.title = movie.title;
//     movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
//     movieInDb.numberInStock = movie.numberInStock;
//     movieInDb.dailyRentalRate = movie.dailyRentalRate;



//     if (!movieInDb._id) {
//         movieInDb._id = Date.now().toString();
//         movies.push(movieInDb);
//     }

//     return movieInDb;
// }

export async function deleteMovie(id) {

    return http.delete(apiService + id);

}
