import jwtDecode from 'jwt-decode';
import http from './httpsService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

// set jwt function handled in http component to remove bi-directional dependancies
// authService is reliant on httpService. authService shouldn't also be reliant on httpService
http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {

    try {

        const jwt = getJwt();

        return jwtDecode(jwt);

    } catch (error) {
        return null;
    }

}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
}