import { UserType } from "./types";

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');
    if (!user) {
        console.log('no user');
        localStorage.setItem('user', JSON.stringify({ loggedIn: false }));
    }
    return user as UserType
}

export const saveUser = (user: UserType) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const clearUser = () => {
    localStorage.clear()
    localStorage.setItem('user', JSON.stringify({ loggedIn: false }));
    window.location.reload();
}