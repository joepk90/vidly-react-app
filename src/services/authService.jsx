import jwtDecode from 'jwt-decode';
import http from './httpsService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

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
    getJwt
}