import axios from 'axios';

const apiService = 'http://localhost:3000/api/';

export async function getGenres() {

    const { data } = await axios.get(apiService + 'genres');

    console.log(data);

    return data;

    // return genres.filter(g => g);
}
