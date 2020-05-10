import http from './httpsService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {

    return http.get(apiEndpoint);
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

    return http.delete(apiEndpoint);

}
