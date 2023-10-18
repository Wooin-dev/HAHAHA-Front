import { atom } from 'recoil';

export const isLogined = atom({
    key: 'loginState',
    default: false
});

export const loginUsername = atom({
    key: 'loginUsername',
    default: null
});