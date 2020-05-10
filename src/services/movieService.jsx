import axios from 'axios';

const apiService = 'http://localhost:3000/api/';

export async function getMovies() {

    const { data } = await axios.get(apiService + 'movies');

    console.log(data);

    return data;
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
    // let movieInDb = movies.find(m => m._id === id);
    // movies.splice(movies.indexOf(movieInDb), 1);
    // return movieInDb;
}
