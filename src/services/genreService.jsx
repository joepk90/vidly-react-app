import http from './httpsService';

const apiService = 'http://localhost:3000/api/';

export function getGenres() {

    return http.get(apiService + 'genres');

    // return genres.filter(g => g);
}
