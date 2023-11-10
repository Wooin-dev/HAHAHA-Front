import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
    // const value = `; ${document.cookie}`;
    // const parts = value.split(`; ${name}=`);
    // console.log("get Cookie 실행");
    // if (parts.length === 2) return parts.pop().split(';').shift();
    const gotCookie = cookies.get(name);
    console.log(gotCookie);
    return gotCookie;
}

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options})
}

export const removeCookie = (name) => {
    return cookies.remove(name);
}