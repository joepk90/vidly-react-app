import http from './httpsService';

const apiEndpoint = "/genres";

export function getGenres() {
    return http.get(apiEndpoint);
}
