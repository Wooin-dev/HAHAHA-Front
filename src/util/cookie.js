import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
    const gotCookie = cookies.get(name);
    return gotCookie;
}

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options})
}

export const removeCookie = (name) => {
    return cookies.remove(name);
}